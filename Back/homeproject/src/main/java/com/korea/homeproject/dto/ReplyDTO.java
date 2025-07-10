package com.korea.homeproject.dto;

import java.time.LocalDateTime;

import com.korea.homeproject.model.BoardEntity;
import com.korea.homeproject.model.ReplyEntity;
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
public class ReplyDTO {
	
	@Schema(description = "댓글 고유 번호",example = "1")
	private long replyNo;
	@Schema(description = "댓글 내용",example = "댓글 내용 입니다")
	private String replyContent;
	@Schema(description = "댓글 좋아요",example = "3")
	private int replyLike;
	@Schema(description = "댓글 안좋아요",example = "4")
	private int replyUnLike;
	
	@Schema(description = "댓글 생성 시간",example = "2025-07-10")
	private LocalDateTime replyCreateAt;
	@Schema(description = "댓글 수정 시간",example = "2025-07-11")
	private LocalDateTime replyUpdateAt;
	
	//조인	
	@Schema(description = "작성된 게시판 번호",example = "100")
	private long boardNo;
	@Schema(description = "작성한 유저 번호",example = "1")
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
