package com.korea.homeproject.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.korea.homeproject.dto.UserDTO;
import com.korea.homeproject.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {
	
	@Autowired
	private final UserService userservice;
	
	@GetMapping
	public String home() {
		return "인증페이지 입니다";
	}
	
	//로그인
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody UserDTO dto){
		UserDTO result = userservice.login(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//로그아웃
	public ResponseEntity<?> logout(){
		userservice.logout();
		return ResponseEntity.ok().body(null);
	}
	
	//회원가입
	@PostMapping("/signup")
	public ResponseEntity<?> signup(@RequestBody UserDTO dto){
		System.out.println("컨트롤러"+dto);
		UserDTO result = userservice.signup(dto);
		return ResponseEntity.ok().body(result);
	}

}
