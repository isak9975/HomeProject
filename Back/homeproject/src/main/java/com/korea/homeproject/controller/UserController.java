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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "user", description = "유저 API - 유저에 관한 모든것")
@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class UserController {
	
	@Autowired
	private final UserService userservice;
	
	//로그인
	@PostMapping("/login")
	@Operation(summary = "유저 로그인", description = "토큰 생성해서 유저에 반환")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "userEmail",description = "이메일"),
		@Parameter(name = "userPassword",description = "비밀번호"),
	})
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
	@Operation(summary = "유저 회원가입", description = "유저 회원가입")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "userEmail",description = "이메일 - 중복 불가"),
		@Parameter(name = "userPassword",description = "비밀번호"),
		@Parameter(name = "userNickname",description = "닉네임 - 중복 불가"),
		@Parameter(name = "userImg",description = "프로필사진 등록안할시 default")
		
	})
	public ResponseEntity<?> signup(@RequestBody UserDTO dto){
		System.out.println("컨트롤러"+dto);
		UserDTO result = userservice.signup(dto);
		return ResponseEntity.ok().body(result);
	}

}
