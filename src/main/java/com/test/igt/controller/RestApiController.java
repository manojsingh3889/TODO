package com.test.igt.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.test.igt.model.TodoPoint;
import com.test.igt.service.TodoPointService;
import com.test.igt.util.CustomErrorType;

@RestController
@RequestMapping("/api")
public class RestApiController {

	public static final Logger logger = LoggerFactory.getLogger(RestApiController.class);

	@Autowired
	TodoPointService todoPointService; 


	@RequestMapping(value = "/points/", method = RequestMethod.GET)
	public ResponseEntity<List<TodoPoint>> listAllUsers() {
		logger.info("Loading all points");
		List<TodoPoint> points = todoPointService.findAllTodoPoints();
		if (points.isEmpty()) {
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<List<TodoPoint>>(points, HttpStatus.OK);
	}

	@RequestMapping(value = "/create/", method = RequestMethod.POST)
	public ResponseEntity<?> createPoint(@RequestBody String point, UriComponentsBuilder ucBuilder) {
		logger.info("Creating point : {}", point);
		
		TodoPoint todoPoint = new TodoPoint()
				.setArchived(false)
				.setCompleted(false)
				.setTitle(point);
			
		todoPointService.saveTodoPoint(todoPoint);

		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/points/{id}").buildAndExpand(todoPoint.getId()).toUri());
		return new ResponseEntity<String>(headers, HttpStatus.CREATED);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> deleteUser(@PathVariable("id") long id) {
		logger.info("Fetching & Deleting point with id {}", id);

		TodoPoint point = todoPointService.findById(id);
		if (point == null) {
			logger.error("Unable to delete. Point with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to delete. Point with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		todoPointService.deleteTodoPointById(id);
		return new ResponseEntity<TodoPoint>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/complete/{id}", method = RequestMethod.PUT)
	public ResponseEntity<?> completeUser(@PathVariable("id") long id) {
		logger.info("Fetching & completing point with id {}", id);

		TodoPoint point = todoPointService.findById(id);
		point.setCompleted(true);
		if (point == null) {
			logger.error("Unable to complete. Point with id {} not found.", id);
			return new ResponseEntity(new CustomErrorType("Unable to complete. Point with id " + id + " not found."),
					HttpStatus.NOT_FOUND);
		}
		todoPointService.updateTodoPoint(point);
		return new ResponseEntity<TodoPoint>(HttpStatus.NO_CONTENT);
	}
}