package com.test.igt;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.test.igt.configuration.JpaConfiguration;


@Import(JpaConfiguration.class)
@SpringBootApplication(scanBasePackages={"com.test.igt"})// same as @Configuration @EnableAutoConfiguration @ComponentScan
public class Todo {

	public static void main(String[] args) {
		SpringApplication.run(Todo.class, args);
	}
}
