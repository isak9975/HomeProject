package com.korea.homeproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.korea.homeproject.model.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity, Long>{
	Optional<BoardEntity> findByBoardCategory(String categoryNo);
	
	@Query("SELECT b FROM BoardEntity b LEFT JOIN FETCH b.replyEntities WHERE b.boardNo = :boardNo")
	Optional<BoardEntity> findByIdWithReplies(@Param("boardNo") Long boardNo);
}
