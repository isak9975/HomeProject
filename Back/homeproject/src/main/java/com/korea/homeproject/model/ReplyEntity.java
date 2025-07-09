package com.korea.homeproject.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.korea.homeproject.dto.ReplyDTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "replytable")
public class ReplyEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long replyNo;
	
	private String replyContent;
	private int replyLike;
	private int replyUnLike;
	
	@CreationTimestamp
	private LocalDateTime replyCreateAt;
	@UpdateTimestamp
	private LocalDateTime replyUpdateAt;
	
	//조인
	@ManyToOne
	@JoinColumn(name = "boardNo")
	private BoardEntity boardEntity;
	
	@ManyToOne
	@JoinColumn(name = "userNo")
	private UserEntity userEntity;
	
	public ReplyDTO toDTO() {
		return ReplyDTO
				.builder()
					.replyNo(replyNo)
					.replyContent(replyContent)
					.replyLike(replyLike)
					.replyUnLike(replyUnLike)
					.replyCreateAt(replyCreateAt)
					.replyUpdateAt(replyUpdateAt)
					.boardNo(boardEntity != null ? boardEntity.getBoardNo(): null)
					.userNo(userEntity != null ? userEntity.getUserNo(): null)
				.build();
	}

}
