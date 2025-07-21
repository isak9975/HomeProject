package com.korea.homeproject.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.korea.homeproject.dto.BoardDTO;
import com.korea.homeproject.model.BoardEntity;
import com.korea.homeproject.model.UserEntity;
import com.korea.homeproject.repository.BoardRepository;
import com.korea.homeproject.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class BoardService {
	@Autowired
	private final BoardRepository boardRepository;
	
	@Autowired
	private final UserRepository userRepository;
	
	//c
	public List<BoardDTO> write(BoardDTO dto){
		
		UserEntity userEntity = userRepository.findById(dto.getUserNo()).get();
		
		BoardEntity boardEntity = dto.toEntity(userEntity);
		
		boardRepository.save(boardEntity);
		
		return findAll();
	}
	
	
	//r
	@Transactional
	public List<BoardDTO> findAll(){
		List<BoardEntity> boardEntities = boardRepository.findAll();
		List<BoardDTO> result = boardEntities.stream().map(t->t.toDTO()).collect(Collectors.toList());
		return result;
	}
	
	
	//r-category
	public List<BoardDTO> findByCategory(String category){
		
		List<BoardDTO> result = boardRepository.findByBoardCategory(category).stream().map(t->t.toDTO()).collect(Collectors.toList());
		  
		return result; 
	}
	
	
	//r-boardNo
	public List<BoardDTO> findByBoardNo(Long boardNo){
		
		List<BoardDTO> result = boardRepository.findById(boardNo).stream().map(t->t.toDTO()).collect(Collectors.toList());
		  
		return result; 
	}
	
	
	
	//u
	@Transactional
	public List<BoardDTO> update(BoardDTO dto){
		boardRepository.findByIdWithReplies(dto.getBoardNo())
			.ifPresent(t -> {
				t.setBoardTitle(dto.getBoardTitle());
				t.setBoardCategory(dto.getBoardCategory());
				t.setBoardContent(dto.getBoardContent());
				t.setBoardImg(dto.getBoardImg());
				boardRepository.save(t);
				});
		
				
		return findAll();
	}
	
	
	//u-좋아요,안좋아요,뷰어
	@Transactional
	public boolean updateState(BoardDTO dto) {
		boardRepository.findByIdWithReplies(dto.getBoardNo())
			.ifPresent(t->{
				t.setBoardLike(dto.getBoardLike());
				t.setBoardUnLike(dto.getBoardUnLike());
				t.setBoardView(dto.getBoardView());
				boardRepository.save(t);
			});
		
		return true;
	}
	
	
	//d
	public boolean delete(long boardNo) {
		
		if(boardNo<=0) {
			throw new RuntimeException("잘못된 게시판 번호입니다.");
		}
		
		boardRepository.deleteById(boardNo);
		
		return true;
	}

}
