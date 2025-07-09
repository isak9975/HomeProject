package com.korea.homeproject.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.korea.homeproject.config.TokenProvider;
import com.korea.homeproject.dto.UserDTO;
import com.korea.homeproject.model.UserEntity;
import com.korea.homeproject.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	@Autowired
	private final UserRepository userRepository;
	private final TokenProvider tokenProvider;
	private final PasswordEncoder passwordEncoder;
	
	//로그인
	public UserDTO login(UserDTO dto){
		//작성한 이메일이 회원가입된 이메일인지 확인.
		UserEntity userEntity = userRepository.findByUserEmail(dto.getUserEmail())
				.orElseThrow(()->new RuntimeException("가입되지 않은 이메일입니다."));
		
		// 비밀번호 비교
		if (!passwordEncoder.matches(dto.getUserPassword(), userEntity.getUserPassword())) {
			throw new RuntimeException("비밀번호가 일치하지 않습니다.");
		}
		
		//토큰 발급
		String token = tokenProvider.createToken(userEntity.getUserEmail());
		
		//반환 DTO
		UserDTO resultDTO = userEntity.toDTO();
		//비밀번호 가리기.
		resultDTO.setUserPassword(null);
		resultDTO.setToken(token);
		return resultDTO;
	}
	
	//로그아웃
	public void logout(){
		

	}
	
	//회원가입
	public UserDTO signup(UserDTO dto){
		System.out.println("전달받는 dto"+dto);
		//죽복 이메일 체크
		if(userRepository.findByUserEmail(dto.getUserEmail()).isPresent()) {
			new RuntimeException("이미 가입된 이메일입니다.");
		}
		
		//비밀번호 암호화
		String encodedPassword = passwordEncoder.encode(dto.getUserPassword());
		
		//새로운 유저 엔티티 생성 및 저장
		UserEntity userEntity = dto.toEntity();
		
		userEntity.setUserPassword(encodedPassword);
		
		//저장
		userRepository.save(userEntity);
		
		//회원가입한 내용으로 회원 반환하기.
		return userRepository.findByUserEmail(dto.getUserEmail()).get().toDTO();
	}
	
}
