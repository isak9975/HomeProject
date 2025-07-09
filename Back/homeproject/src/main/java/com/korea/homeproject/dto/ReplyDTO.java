package com.korea.homeproject.dto;

import java.time.LocalDateTime;

import com.korea.homeproject.model.BoardEntity;
import com.korea.homeproject.model.ReplyEntity;
import com.korea.homeproject.model.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyDTO {
	
	private long replyNo;
	private String replyContent;
	private int replyLike;
	private int replyUnLike;
	
	private LocalDateTime replyCreateAt;
	private LocalDateTime replyUpdateAt;
	
	//조인	
	private long boardNo; 
	private long userNo;
	
	public ReplyEntity toEntity(BoardEntity boardEntity, UserEntity userEntity) {
		return ReplyEntity
				.builder()
					.replyNo(replyNo)
					.replyContent(replyContent)
					.replyLike(replyLike)
					.replyUnLike(replyUnLike)
					.replyCreateAt(replyCreateAt)
					.replyUpdateAt(replyUpdateAt)
					.boardEntity(boardEntity)
					.userEntity(userEntity)
				.build();
	}
}
