package com.korea.homeproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.korea.homeproject.model.ReplyEntity;

public interface ReplyRepository extends JpaRepository<ReplyEntity, Long>{
	
	Optional<ReplyEntity> findByUserEntity_UserNo(long userNo);
	
	Optional<ReplyEntity> findByBoardEntity_BoardNo(long boardNo);
}
