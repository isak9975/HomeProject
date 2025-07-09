package com.korea.homeproject.config;

import java.io.IOException;
import java.util.Collections;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtFilter extends OncePerRequestFilter{
	
	private final TokenProvider tokenProvider;
	
	public JwtFilter(TokenProvider tokenProvider) {
		this.tokenProvider = tokenProvider;		
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String header = request.getHeader("Authorization");
		if(header != null && header.startsWith("Bearer ")) {
			String token = header.substring(7);
			
			if(tokenProvider.validateToken(token)) {
				//토큰에서 유저 이메일 뽑아내기				
				String user_email = tokenProvider.getUserEmailFromToken(token);
				//유저 이메일만을 사용하여 인증객체 생성하기.(유저 이메일, 비밀번호 null, 권한 null)
				var auth = new UsernamePasswordAuthenticationToken(user_email, null,Collections.emptyList());
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}
		filterChain.doFilter(request, response);
	}
}
