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

import com.korea.homeproject.dto.ReplyDTO;
import com.korea.homeproject.service.ReplyService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {
	
	@Autowired
	private final ReplyService replyService;
	
	//c
	@PostMapping
	public ResponseEntity<?> wrtie(@RequestBody ReplyDTO dto){
		List<ReplyDTO> result = replyService.write(dto); 
		return ResponseEntity.ok().body(result);
	}
	
	
	//r-보드
	@GetMapping
	public ResponseEntity<?> findByBoardNo(@RequestParam long boardNo){
		List<ReplyDTO> result = replyService.findByBoardNo(boardNo);
		return ResponseEntity.ok().body(result);
	}
	
	
	//r-유저
	@GetMapping("/user")
	public ResponseEntity<?> findByUserNo(@RequestParam long UserNo){
		List<ReplyDTO> result = replyService.findByUserNo(UserNo);
		return ResponseEntity.ok().body(result);
	}
	
	//u
	@PutMapping
	public ResponseEntity<?> update(@RequestBody ReplyDTO dto){
		List<ReplyDTO> result = replyService.update(dto);
		return ResponseEntity.ok().body(result);
	}
	
	
	//u-state
	@PutMapping("/state")
	public ResponseEntity<?> updateState(@RequestBody ReplyDTO dto){
		List<ReplyDTO> result = replyService.updateState(dto);
		return ResponseEntity.ok().body(result);
	}
	
	
	//d
	@DeleteMapping
	public ResponseEntity<?> delete(@RequestParam long replyNo){
		boolean result = replyService.delete(replyNo);
		return ResponseEntity.ok().body(result);
	}
 
}
