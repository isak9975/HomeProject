package com.korea.homeproject.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.korea.homeproject.service.S3Service;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/s3")
public class S3Controller {
	
	@Autowired
	private final S3Service s3Service;
	
	
	//1) S3에 파일 올리고 접속 가능한 URL 반환받기.
	@PostMapping("/file")
	public ResponseEntity<?> uploadImageToS3(@RequestParam("file") MultipartFile file, @RequestParam("userEmail")String userEmail,@RequestParam("folder")String folder){
		
		try {
			String result = s3Service.uploadImageToS3(file,folder);
			System.out.println("파일 업로드 성공.");
			return ResponseEntity.ok(Map.of("fileUrl",result));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
						.body(Map.of("error","파일 업로드 실패 :"+e.getMessage()));
		}
	}
	
	//2) 파일 다운받기
	public ResponseEntity<?> downloadImage(String originfilename){
		ResponseEntity result =s3Service.downloadImg(originfilename);
		return result;
	}

}
