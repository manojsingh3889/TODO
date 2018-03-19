package com.test.igt.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.igt.model.TodoPoint;

@Repository
public interface TodoPointRepository extends JpaRepository<TodoPoint, Long> {
	TodoPoint findByTitle(String title);
}
