package com.korea.homeproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korea.homeproject.dto.BoardDTO;
import com.korea.homeproject.service.BoardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
	
	@Autowired
	private final BoardService boardService;
	
	//C
	@PostMapping
	public ResponseEntity<?> write(@RequestBody BoardDTO dto){
		List<BoardDTO> result = boardService.write(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//R
	@GetMapping
	public ResponseEntity<?> findAll(){
		List<BoardDTO> result = boardService.findAll();
		return ResponseEntity.ok().body(result);
	}
	
	//R-category별로
	@GetMapping("/category")
	public ResponseEntity<?> findByCategory(@RequestParam String category){
		List<BoardDTO> result = boardService.findByCategory(category);
		return ResponseEntity.ok().body(result);
	}
	
	//U
	@PutMapping
	public ResponseEntity<?> update(@RequestBody BoardDTO dto){
		List<BoardDTO> result = boardService.update(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//u-일부
	@PutMapping("/state")
	public ResponseEntity<?> updateState(@RequestBody BoardDTO dto) {
		boolean result = boardService.updateState(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//D
	@DeleteMapping
	public ResponseEntity<?> delete(@RequestParam Long boardNo){
		boolean result = boardService.delete(boardNo);
		return ResponseEntity.ok().body(result);
	}
	

}
