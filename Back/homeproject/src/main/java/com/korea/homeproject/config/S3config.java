package com.korea.homeproject.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class S3config {

	@Value("${AWS_ACCESS_KEY}")
	private String accessKey;
	
	@Value("${AWS_SECRET_KEY}")
	private String secretKey;
	
	@Value("${cloud.aws.region.static}")
	private String region;
	
	@Bean
	public AmazonS3Client amazonS3Client(){
		//accessKey, secretKey, region 값으로 S3에 접근 가능한 객체 등록
		BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey);
		
		return (AmazonS3Client) AmazonS3ClientBuilder
				.standard()
				.withRegion(region)
				.withCredentials(new AWSStaticCredentialsProvider(credentials))
				.build();
	}
}
