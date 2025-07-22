package com.korea.homeproject.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.korea.homeproject.dto.ReplyDTO;
import com.korea.homeproject.model.BoardEntity;
import com.korea.homeproject.model.ReplyEntity;
import com.korea.homeproject.model.UserEntity;
import com.korea.homeproject.repository.BoardRepository;
import com.korea.homeproject.repository.ReplyRepository;
import com.korea.homeproject.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ReplyService {
	
	@Autowired
	private final ReplyRepository replyRepository;
	@Autowired
	private final UserRepository userRepository;
	@Autowired
	private final BoardRepository boardRepository;
	
	
	//c
	public List<ReplyDTO> write(ReplyDTO dto){
		
		UserEntity userEntity = userRepository.findById(dto.getUserNo()).get();
		
		BoardEntity boardEntity = boardRepository.findById(dto.getBoardNo()).get();
		
		ReplyEntity replyEntity = dto.toEntity(boardEntity,userEntity);
		
		replyRepository.save(replyEntity);
		
		return replyRepository.findAll().stream().map(t->t.toDTO()).collect(Collectors.toList());
	}
	
	//r-boardno
	public List<ReplyDTO> findByBoardNo(long boardNo){
		List<ReplyDTO> result = replyRepository.findByBoardEntity_BoardNo(boardNo).stream().map(t->t.toDTO()).collect(Collectors.toList());
		return result;
	}
	
	//r-userno
	public List<ReplyDTO> findByUserNo(long userNo){
		List<ReplyDTO> result = replyRepository.findByUserEntity_UserNo(userNo).stream().map(t->t.toDTO()).collect(Collectors.toList());
		return result;
	}
	
	//u
	public List<ReplyDTO> update(ReplyDTO dto){
		
		replyRepository.findById(dto.getReplyNo()).ifPresent(t ->{
			t.setReplyContent(dto.getReplyContent());
			replyRepository.save(t);
		});
		
		return replyRepository.findAll().stream().map(t->t.toDTO()).collect(Collectors.toList()); 
	}
	
	
	//u/state
	public List<ReplyDTO> updateState(ReplyDTO dto){
		
		replyRepository.findById(dto.getReplyNo()).ifPresent(t ->{
			t.setReplyLike(dto.getReplyLike());
			t.setReplyUnLike(dto.getReplyUnLike());
			replyRepository.save(t);
		});
		
		return replyRepository.findAll().stream().map(t->t.toDTO()).collect(Collectors.toList()); 
	}
	
	
	
	//d
	public boolean delete(long replyNo) {
		if(replyNo<=0) {
			throw new RuntimeException("잘못된 댓글 번호입니다.");
		}
		
		replyRepository.deleteById(replyNo);
		return true;
	}
}
