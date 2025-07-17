package com.korea.homeproject;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:.env")
class HomeprojectApplicationTests {

	@Test
	void contextLoads() {
	}

}
