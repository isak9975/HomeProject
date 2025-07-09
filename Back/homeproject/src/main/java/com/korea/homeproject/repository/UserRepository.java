package com.korea.homeproject.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.korea.homeproject.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
	Optional<UserEntity> findByUserEmail(String userEmail);
}
