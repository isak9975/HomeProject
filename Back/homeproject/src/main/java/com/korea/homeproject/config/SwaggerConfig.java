package com.korea.homeproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI openAPI() {
		return new OpenAPI().components(new Components())
			.info(info());
	}
	
	private Info info() {
		return new Info()
				.title("Swagger UI - HomeProject API")//API의 제목
				.description("HomeProject-개인프로젝트 api 설명서") //API의 대한 설명
				.version("v1");//API의 버전
	}

}
