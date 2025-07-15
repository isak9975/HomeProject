package com.korea.homeproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korea.homeproject.dto.UserDTO;
import com.korea.homeproject.service.MailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mail")
public class MailController {
	
	private final MailService mailService;
	
	@PostMapping("/send")
	public ResponseEntity<?> sendMail(@RequestBody UserDTO  dto) {
		String authCode = createAuthCode();
		mailService.sendVerificationMail(dto, authCode);
		//인증번호를 반환		
		return ResponseEntity.ok().body(authCode);
	}
	
	// 인증코드 6자리 무작위 생성
	private String createAuthCode() {
		return Integer.toString((int)(Math.random()*900000)+100000); //6자리
	}

}
