package com.korea.homeproject.dto;

import java.time.LocalDateTime;

import com.korea.homeproject.model.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
	private Long userNo;
	private String userNickname;
	private String userEmail;
	private String userPassword;
	private String userImg;
	
	private String token;
	
	private LocalDateTime userCreateAt;
	private LocalDateTime userUpdatedAt;
	
	public UserEntity toEntity() {
		return UserEntity
				.builder()
					.userNo(userNo)
					.userEmail(userEmail)
					.userImg(userImg)
					.userNickname(userNickname)
					.userPassword(userPassword)
					.userUpdatedAt(userUpdatedAt)
					.userCreateAt(userCreateAt)
				.build();		
	}

}
