package com.korea.homeproject.dto;

import java.time.LocalDateTime;

import com.korea.homeproject.model.UserEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	@Schema(description = "유저 고유 번호",example = "1")
	private Long userNo;
	@Schema(description = "유저 닉네임",example = "스웨거1")
	private String userNickname;
	@Schema(description = "유저 이메일",example = "example@example.com")
	private String userEmail;
	@Schema(description = "유저 비밀번호",example = "00000000")
	private String userPassword;
	@Schema(description = "유저 프로필 이미지",example = "default.jpg")
	private String userImg;
	@Schema(description = "유저 권한 상태",example = "user")
	private String role;
	
	@Schema(description = "유저 로그인 토큰",example = "--")
	private String token;
	
	@Schema(description = "유저 회원가입 날짜",example = "2025-07-10")
	private LocalDateTime userCreateAt;
	@Schema(description = "유저 정보 수정 날짜",example = "2025-07-11")
	private LocalDateTime userUpdatedAt;
	
	public UserEntity toEntity() {
		return UserEntity
				.builder()
					.userNo(userNo)
					.userEmail(userEmail)
					.userImg(userImg)
					.role(role)
					.userNickname(userNickname)
					.userPassword(userPassword)
					.userUpdatedAt(userUpdatedAt)
					.userCreateAt(userCreateAt)
				.build();		
	}

}
