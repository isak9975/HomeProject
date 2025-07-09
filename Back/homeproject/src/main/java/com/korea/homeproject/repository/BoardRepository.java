package com.korea.homeproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.korea.homeproject.model.BoardEntity;

public interface BoardRepository extends JpaRepository<BoardEntity, Long>{
	Optional<BoardEntity> findByBoardCategory(String categoryNo);
}
