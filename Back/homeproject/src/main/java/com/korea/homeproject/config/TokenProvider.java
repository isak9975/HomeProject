package com.korea.homeproject.config;

import java.security.Key;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class TokenProvider {

	private final SecretKey key = Jwts.SIG.HS256.key().build();
	private final long TOKEN_VALIDITY = 1000*60 * 60 *12; //12시간
	
	//토큰 생성
	public String createToken(String userId) {
		Date now = new Date();
		Date expiryDate = new Date(now.getTime() + TOKEN_VALIDITY);
		
		return Jwts.builder()
				.subject(userId)
				.signWith(key)
				.issuedAt(now)
				.expiration(expiryDate)
				.signWith(key)
				.compact();
	}
	
	
	//토큰에서 이메일 추출
	public String getUserEmailFromToken(String token) {
		return Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getSubject();	
	}
	
	
	//토큰 유효성 검사
	public boolean validateToken(String token) {
		try {
			Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	
	
	
}
