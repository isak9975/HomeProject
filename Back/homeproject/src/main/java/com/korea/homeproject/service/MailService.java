package com.korea.homeproject.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.korea.homeproject.dto.UserDTO;
import com.korea.homeproject.repository.UserRepository;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MailService {
	
	private final UserRepository userRepository;
	private final JavaMailSender mailSender;
	
	//보내는 사람 메일 주소	
	@Value("${spring.mail.username}")
	private String from;
	
	//이메일 + 아이디 입력받아서 authcode 반환하기.	
	public void sendVerificationMail(UserDTO dto,String  authCode) {
		
		if(!(userRepository.findByUserId(dto.getUserId()).isPresent())) {
			throw new RuntimeException("해당되는 아이디가 없습니다.");
		}
		
		if(!(userRepository.findByUserEmail(dto.getUserEmail()).isPresent())) {
			throw new RuntimeException("해당되는 이메일이 없습니다.");
		}
		
		if(!(userRepository.findByUserId(dto.getUserId()).get().getUserEmail().equals(dto.getUserEmail()))) {
			throw new RuntimeException("아이디 또는 이메일이 잘못되었습니다.");
		}
		
		
		//인증번호 발송하기			
		String subject = "[MyBlog] 이메일 인증 코드입니다.";
		String body = "인증 코드 : <b>"+authCode+"</b>" ;
		
		try {
			MimeMessage message = mailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(message,true,"UTF-8");
			
			helper.setTo(dto.getUserEmail());
			helper.setFrom(from);
			helper.setSubject(subject);
			//true = HTML			
			helper.setText(body,true);
			
			mailSender.send(message);		
		} catch (Exception e) {
			throw new RuntimeException("이메일 전송에 실패했습니다."+e);
		}
	}
	

}
