package com.korea.homeproject.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.korea.homeproject.dto.BoardDTO;
import com.korea.homeproject.service.BoardService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Tag(name = "board", description = "보드 API - 게시판 작성 CRUD")
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {
	
	@Autowired
	private final BoardService boardService;
	
	//C
	@PostMapping
	@Operation(summary = "게시글 작성", description = "게시글 작성")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "boardCategory",description = "게시판 카테고리"),
		@Parameter(name = "boardTitle",description = "게시판 제목"),
		@Parameter(name = "boardContent",description = "게시판 내용"),
		@Parameter(name = "boardImg",description = "게시판 썸네일"),
	})
	public ResponseEntity<?> write(@RequestBody BoardDTO dto){
		List<BoardDTO> result = boardService.write(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//R
	@GetMapping
	@Operation(summary = "게시글 찾기", description = "모든 게시글 반환")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	public ResponseEntity<?> findAll(){
		List<BoardDTO> result = boardService.findAll();
		return ResponseEntity.ok().body(result);
	}
	
	//R-category별로
	@GetMapping("/category")
	@Operation(summary = "카테고리 별로 찾기", description = "게시글 카테고리 별로 반환")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "boardCategory",description = "게시판 카테고리")
	public ResponseEntity<?> findByCategory(@RequestParam String category){
		List<BoardDTO> result = boardService.findByCategory(category);
		return ResponseEntity.ok().body(result);
	}
	
	
	//R-boardNo별로
	@GetMapping("/detail/{boardNo}")
	@Operation(summary = "게시판 번호 별로 찾기", description = "게시글 번호 별로 반환")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "boardNo",description = "게시판 번호")
	public ResponseEntity<?> findByBoardNo(@PathVariable(name = "boardNo") Long boardNo){
		List<BoardDTO> result = boardService.findByBoardNo(boardNo);
		return ResponseEntity.ok().body(result);
	}
	
	
	//U
	@PutMapping
	@Operation(summary = "게시글 수정", description = "게시글 수정")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "boardCategory",description = "게시판 카테고리"),
		@Parameter(name = "boardTitle",description = "게시판 제목"),
		@Parameter(name = "boardContent",description = "게시판 내용"),
		@Parameter(name = "boardImg",description = "게시판 썸네일"),
	})
	public ResponseEntity<?> update(@RequestBody BoardDTO dto){
		List<BoardDTO> result = boardService.update(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//u-일부
	@PutMapping("/state")
	@Operation(summary = "게시글 상태 수정", description = "게시글 상태 수정")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameters({
		@Parameter(name = "boardLike",description = "게시판 좋아요"),
		@Parameter(name = "boardUnLike",description = "게시판 안좋아요"),
		@Parameter(name = "boardView",description = "게시판 조회수"),
	})
	public ResponseEntity<?> updateState(@RequestBody BoardDTO dto) {
		boolean result = boardService.updateState(dto);
		return ResponseEntity.ok().body(result);
	}
	
	//D
	@DeleteMapping("/{boardNo}")
	@Operation(summary = "게시글 삭제", description = "게시글 번호로 게시글 삭제")
	@ApiResponses({
		@ApiResponse(responseCode = "200", description = "성공"),
		@ApiResponse(responseCode = "4xx", description = "실패")
	})
	@Parameter(name = "boardNo",description = "게시글 번호")
	public ResponseEntity<?> delete(@PathVariable(name = "boardNo") Long boardNo){
		boolean result = boardService.delete(boardNo);
		return ResponseEntity.ok().body(result);
	}
	

}
