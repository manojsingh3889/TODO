package com.test.igt.service;


import java.util.List;

import com.test.igt.model.TodoPoint;

public interface TodoPointService {
	
	TodoPoint findById(Long id);

	void saveTodoPoint(TodoPoint todoPoint);

	void updateTodoPoint(TodoPoint todoPoint);

	void deleteTodoPointById(Long id);

	void deleteAllTodoPoints();

	List<TodoPoint> findAllTodoPoints();
}