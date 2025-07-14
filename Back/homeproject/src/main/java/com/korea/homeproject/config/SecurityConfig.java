package com.korea.homeproject.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

	public final JwtFilter jwtFilter;
	
	public SecurityConfig(JwtFilter jwtFilter) {
		this.jwtFilter = jwtFilter;		
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		http
			.cors(Customizer.withDefaults()) //cors 활성화
			.csrf(csrf -> csrf.disable()) //CSRF 비활성화
			.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) //세션 사용안함.
			//URL별 권한 설정
			.authorizeHttpRequests(auth -> auth
					.requestMatchers(
							"/",
							"/signup",
							"/signup/**",
							"/login",
							"/s3/**",
							"/auth/**",
							"/swagger-ui/**",
							"/swagger-ui.html",
							"/v/api-docs/**"
							).permitAll() //인증없이 접근 허용
					.anyRequest().authenticated() //나머지는 인증 필요
					);

		//Jwt 필터를 UsernamePasswordAuthenticationFilter 전에 실행하도록 등록		
		http.addFilterBefore(jwtFilter,UsernamePasswordAuthenticationFilter.class);
		
		
		return http.build();
	}
	
	//AuthenticationManager 빈 등록(로그인 인증 시 사용)
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
		return config.getAuthenticationManager();
	}
	
	//Cors에 대한 설정		
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration config = new CorsConfiguration();
		config.setAllowedOrigins(List.of("http://localhost:3000"));
		config.setAllowedMethods(List.of("GET","PUT","DELETE","POST"));
		config.setAllowCredentials(true);
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");
		config.setAllowedHeaders(List.of("*"));
		
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);
		return source;
	}
	
	//비밀번호 인코드 등록.
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
