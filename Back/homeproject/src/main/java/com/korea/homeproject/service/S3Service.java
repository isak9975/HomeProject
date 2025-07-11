package com.korea.homeproject.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.ec2.model.Image;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.korea.homeproject.model.UserEntity;

import lombok.RequiredArgsConstructor;

@Service@RequiredArgsConstructor
public class S3Service {

	private final AmazonS3 amazonS3;
	@Value("${cloud.aws.s3.bucket}")
	private String bucketName; //버킷 이름
	
	//중복 없는 이름 만들기	
	private String changedImageName(String originName) {//이미지 이름 중복 방지를 위해 랜덤으로 생성
		String random = UUID.randomUUID().toString();
		return random+originName;
	}
	
	
	//1) 파일 업로드 	
	public String uploadImageToS3(MultipartFile image,String folder) throws Exception { //이미지를 S3에 업로드하고 이미지의 url반
		
		String originName = image.getOriginalFilename(); //이미지 원본 이름
		
		String ext = originName.substring(originName.lastIndexOf("."));//확장자 뽑기
		
		String changedName = changedImageName(originName); //새로 생성된 이미지 이름
		
		ObjectMetadata metadata = new ObjectMetadata(); //메타데이터
		metadata.setContentLength(image.getSize());
		metadata.setContentType(image.getContentType());
		
		PutObjectResult putObjectResult = amazonS3.putObject(new PutObjectRequest(
			bucketName,folder+"/"+changedName,image.getInputStream(),metadata
		).withCannedAcl(CannedAccessControlList.PublicRead));
		
		return amazonS3.getUrl(bucketName, folder+"/"+changedName).toString(); //데이터베이스에 저장할 이미지 url	
	}
	
	
	//2) 파일 다운로드
	public ResponseEntity<?> downloadImg(String originfilename) {
		UrlResource urlResource = new UrlResource(amazonS3.getUrl(originfilename, originfilename));
		String contentDisposition = "attachment; filename=\""+originfilename+"\"";
		
		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition)
				.body(urlResource);
				
	} 
	//클라우드 프론트 메모리 초기화 설정.새로운거 바로 넣기.

	
	
}
