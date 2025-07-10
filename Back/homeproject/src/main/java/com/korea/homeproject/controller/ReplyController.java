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

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@Tag(name = "reply", description = "댓글 API - 댓글 작성 CRUD")
@RestController
@RequiredArgsConstructor
@RequestMapping("/reply")
public class ReplyController {
	
	@Autowired
	private final ReplyService replyService;
	
	//c
	@PostMapping
	@Operation(summary = "댓글 작성", description = "댓글 작성")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "replyContent",description = "댓글 내용"),
		@Parameter(name = "boardNo",description = "게시판 번호"),
		@Parameter(name = "userNo",description = "유저 번호"),
	})
	public ResponseEntity<?> wrtie(@RequestBody ReplyDTO dto){
		List<ReplyDTO> result = replyService.write(dto); 
		return ResponseEntity.ok().body(result);
	}
	
	
	//r-보드
	@GetMapping
	@Operation(summary = "댓글 게시판 번호로 찾기", description = "댓글 게시판 번호로 찾기")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "boardNo",description = "게시판 번호")
	public ResponseEntity<?> findByBoardNo(@RequestParam long boardNo){
		List<ReplyDTO> result = replyService.findByBoardNo(boardNo);
		return ResponseEntity.ok().body(result);
	}
	
	
	//r-유저
	@GetMapping("/user")
	@Operation(summary = "댓글 유저 번호로 찾기", description = "댓글 유저 번호로 찾기")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "userNo",description = "유저 번호")
	public ResponseEntity<?> findByUserNo(@RequestParam long UserNo){
		List<ReplyDTO> result = replyService.findByUserNo(UserNo);
		return ResponseEntity.ok().body(result);
	}
	
	//u
	@PutMapping
	@Operation(summary = "댓글 수정", description = "댓글 수정")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "replyContent",description = "댓글 내용")
	public ResponseEntity<?> update(@RequestBody ReplyDTO dto){
		List<ReplyDTO> result = replyService.update(dto);
		return ResponseEntity.ok().body(result);
	}
	
	
	//u-state
	@PutMapping("/state")
	@Operation(summary = "댓글 상태 변경", description = "댓글 상태 변경")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "replyLike",description = "댓글 좋아요"),
		@Parameter(name = "replyUnLike",description = "댓글 안좋아요"),
	})
	public ResponseEntity<?> updateState(@RequestBody ReplyDTO dto){
		List<ReplyDTO> result = replyService.updateState(dto);
		return ResponseEntity.ok().body(result);
	}
	
	
	//d
	@DeleteMapping
	@Operation(summary = "댓글 삭제", description = "댓글 삭제")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "replyNo",description = "댓글 번호로 댓글 삭제")
	public ResponseEntity<?> delete(@RequestParam long replyNo){
		boolean result = replyService.delete(replyNo);
		return ResponseEntity.ok().body(result);
	}
 
}
