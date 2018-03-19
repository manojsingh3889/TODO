package com.test.igt.service;

import java.util.List;

import com.test.igt.model.TodoPoint;
import com.test.igt.repositories.TodoPointRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;



@Service("todoPointService")
@Transactional
public class TodoPointServiceImpl implements TodoPointService{

	@Autowired
	private TodoPointRepository todoPtRepository;

	public TodoPoint findById(Long id) {
		return todoPtRepository.findOne(id);
	}

	public void saveTodoPoint(TodoPoint TodoPoint) {
		todoPtRepository.save(TodoPoint);
	}

	public void updateTodoPoint(TodoPoint TodoPoint){
		saveTodoPoint(TodoPoint);
	}

	public void deleteTodoPointById(Long id){
		todoPtRepository.delete(id);
	}

	public void deleteAllTodoPoints(){
		todoPtRepository.deleteAll();
	}

	public List<TodoPoint> findAllTodoPoints(){
		return todoPtRepository.findAll();
	}
}
