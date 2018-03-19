'use strict';

angular.module('crudApp').controller('TodoController',
		['TodoService', '$scope',  function( TodoService, $scope) {

			var self = this;
			self.user = {};
			self.users=[];

			self.submit = submit;
			self.getAllPoints = getAllPoints;
			self.createPoint = createPoint;
			self.updateUser = updateUser;
			self.deleteTodo = deleteTodo;
			self.completeTodo = completeTodo;
			self.editTodo = editTodo;
			self.reset = reset;

			self.successMessage = '';
			self.errorMessage = '';
			self.done = false;

			self.onlyIntegers = /^\d+$/;
			self.onlyNumbers = /^\d+([,.]\d+)?$/;

			function submit() {
				console.log('Submitting');
				if (self.user.id === undefined || self.user.id === null) {
					console.log('Saving New User', self.user);
					createPoint(self.user);
				} else {
					updateUser(self.user, self.user.id);
					console.log('User updated with id ', self.user.id);
				}
			}

			function createPoint() {

				console.log('About to create point');
				TodoService.createPoint(self.newtodo)
				.then(
						function (response) {
							console.log('point created successfully');
							self.successMessage = 'point created successfully';
							self.errorMessage='';
							self.done = true;
							self.user={};
							$scope.myForm.$setPristine();
							self.newtodo=null;
						},
						function (errResponse) {
							console.error('Error while creating User');
							self.errorMessage = 'Error while creating User: ' + errResponse.data.errorMessage;
							self.successMessage='';
							self.newtodo=null;
						}
				);
			}


			function updateUser(user, id){
				console.log('About to update user');
				TodoService.updateUser(user, id)
				.then(
						function (response){
							console.log('User updated successfully');
							self.successMessage='User updated successfully';
							self.errorMessage='';
							self.done = true;
							$scope.myForm.$setPristine();
						},
						function(errResponse){
							console.error('Error while updating User');
							self.errorMessage='Error while updating User '+errResponse.data;
							self.successMessage='';
						}
				);
			}


			function deleteTodo(id){

				console.log('About to remove todo with id '+id);
				TodoService.deleteTodo(id)
				.then(
						function(){
							console.log('todo '+id + ' removed successfully');
						},
						function(errResponse){
							console.error('Error while removing todo '+id +', Error :'+errResponse.data);
						}
				);
			}

			function completeTodo(id){

				console.log('About to remove todo with id '+id);
				TodoService.completeTodo(id)
				.then(
						function(){
							console.log('todo '+id + ' removed successfully');
						},
						function(errResponse){
							console.error('Error while removing todo '+id +', Error :'+errResponse.data);
						}
				);
			}


			function getAllPoints(){
				return TodoService.getAllPoints();
			}

			function editTodo(todo) {
				self.successMessage='';
				self.errorMessage='';
				TodoService.getUser(id).then(
						function (user) {
							self.user = user;
						},
						function (errResponse) {
							console.error('Error while removing user ' + id + ', Error :' + errResponse.data);
						}
				);
			}
			function reset(){
				self.successMessage='';
				self.errorMessage='';
				self.user={};
				$scope.myForm.$setPristine(); //reset Form
			}
		}


		]);