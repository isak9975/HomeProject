package com.korea.homeproject.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.korea.homeproject.model.BoardEntity;
import com.korea.homeproject.model.UserEntity;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BoardDTO {
	
	@Schema(description = "게시판 고유 번호",example = "1")
	private long boardNo;
	@Schema(description = "게시판 카테고리 번호",example = "1")
	private String boardCategory;
	@Schema(description = "게시판 제목",example = "[카테고리]게시판의 제목입니다")
	private String boardTitle;
	@Schema(description = "게시판 내용",example = "게시물의 내용입니다")
	private String boardContent;
	@Schema(description = "게시판 썸네일 이미지",example = "default.img")
	private String boardImg;
	
	//좋아요 기능
	@Schema(description = "게시판 좋아요",example = "3")
	private int boardLike;
	@Schema(description = "게시판 안좋아요",example = "4")
	private int boardUnLike;
	
	//조회수
	@Schema(description = "게시판 조회수",example = "100")
	private int boardView;
	
	//날짜
	@Schema(description = "게시판 생성 날짜",example = "2025-07-10")
	private LocalDateTime boardCreateAt;
	@Schema(description = "게시판 수정 날짜",example = "2025-07-11")
	private LocalDateTime boardUpdateAt;
	
	//조인
	@Schema(description = "게시판 작성한 유저 번호",example = "1")
	private long userNo;
	@Schema(description = "게시판에 작성된 댓글 번호들",example = "1,5,9,10,11,17")
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
