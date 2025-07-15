package com.korea.homeproject.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.korea.homeproject.dto.UserDTO;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usertable")
public class UserEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "userNo")
	private Long userNo;
	
	@Column(unique = true,name = "userNickname")
	private String userNickname;
	
	@Column(name = "userId")
	private String userId;
	
	@Column(unique = true, name = "userEmail")
	private String userEmail;
	
	@Column(name = "userPassword")
	private String userPassword;
	
	@Column(name = "userImg")
	private String userImg;
	
	@Column(name= "userRole")
	private String role;
	
	
	@CreationTimestamp
	@Column(name = "userCreateAt")
	private LocalDateTime userCreateAt;
	
	@UpdateTimestamp
	@Column(name = "userUpdateAt")
	private LocalDateTime userUpdatedAt;
	
	public UserDTO toDTO() {
		return UserDTO
				.builder()
					.userNo(userNo)
					.userId(userId)
					.userEmail(userEmail)
					.userNickname(userNickname)
					.userPassword(userPassword)
					.userImg(userImg)
					.role(role)
					.userCreateAt(userCreateAt)
					.userUpdatedAt(userUpdatedAt)
				.build();		
	}
}
