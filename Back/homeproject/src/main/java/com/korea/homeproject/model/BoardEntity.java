package com.korea.homeproject.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.korea.homeproject.dto.BoardDTO;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
@Table(name = "boardtable")
public class BoardEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long boardNo;
	private String boardCategory;
	private String boardTitle;
	private String boardContent;
	private String boardImg;
	
	//좋아용
	@Column(columnDefinition = "INT DEFAULT 0")
	private int boardLike;
	@Column(columnDefinition = "INT DEFAULT 0")
	private int boardUnLike;
	
	//조회수
	@Column(columnDefinition = "INT DEFAULT 0")
	private int boardView;
	
	//날짜
	@CreationTimestamp
	private LocalDateTime boardCreateAt;
	@UpdateTimestamp
	private LocalDateTime boardUpdateAt;
	
	//조인
	//유저	
	@ManyToOne
	@JoinColumn(name = "userNo")
	private UserEntity userEntity;
	
	//댓글
	@OneToMany(mappedBy = "boardEntity", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ReplyEntity> replyEntities;
	
	public BoardDTO toDTO() {
		return BoardDTO
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
					.userNo(userEntity != null ? userEntity.getUserNo() : null)
					.replyDtolist(replyEntities !=null? replyEntities.stream().map(t->t.toDTO()).collect(Collectors.toList()):null)
				.build();
	}

}
