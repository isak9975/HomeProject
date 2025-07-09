package com.korea.homeproject.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.korea.homeproject.model.BoardEntity;
import com.korea.homeproject.model.UserEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDTO {
	
	private long boardNo;
	private String boardCategory;
	private String boardTitle;
	private String boardContent;
	private String boardImg;
	
	//좋아요 기능
	private int boardLike;
	private int boardUnLike;
	
	//조회수
	private int boardView;
	
	//날짜
	private LocalDateTime boardCreateAt;
	private LocalDateTime boardUpdateAt;
	
	//조인
	private long userNo;
	private List<ReplyDTO> replyDtolist;
	
	
	public BoardEntity toEntity(UserEntity userEntity) {
		return BoardEntity
				.builder()
					.boardNo(boardNo)
					.boardCategory(boardCategory)
					.boardTitle(boardTitle)
					.boardContent(boardContent)
					.boardImg(boardImg)
					.boardLike(boardLike)
					.boardUnLike(boardUnLike)
					.boardView(boardView)
					.boardCreateAt(boardCreateAt)
					.boardUpdateAt(boardUpdateAt)
					.userEntity(userEntity)
				.build();
	}

}
