'use strict';

angular.module('todoApp').factory('TodoService',
		['$localStorage', '$http', '$q', 'urls',
			function ($localStorage, $http, $q, urls) {

			var factory = {
					loadAllPoints: loadAllPoints,
					getAllPoints: getAllPoints,
					getPoint: getPoint,
					createPoint: createPoint,
					deleteTodo: deleteTodo,
					completeTodo: completeTodo

			};

			return factory;

			function loadAllPoints() {
				console.log('Fetching all points');
				var deferred = $q.defer();
				$http.get(urls.TODO_SERVICE_API)
				.then(
						function (response) {
							console.log('Fetched successfully all points');
							$localStorage.points = response.data;
							deferred.resolve(response);
						},
						function (errResponse) {
							console.error('Error while loading points');
							deferred.reject(errResponse);
						}
				);
				return deferred.promise;
			}

			function getAllPoints(){
				return $localStorage.points;
			}

			function getPoint(id) {
				console.log('Fetching Point with id :'+id);
				var deferred = $q.defer();
				$http.get(urls.USER_SERVICE_API + id)
				.then(
						function (response) {
							console.log('Fetched successfully Point with id :'+id);
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while loading user with id :'+id);
							deferred.reject(errResponse);
						}
				);
				return deferred.promise;
			}

			function createPoint(todo) {
				console.log('Creating Point');
				var deferred = $q.defer();
				$http.post(urls.CREATE_TODO_SERVICE_API, todo)
				.then(
						function (response) {
							loadAllPoints();
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while creating Point : '+errResponse.data.errorMessage);
							deferred.reject(errResponse);
						}
				);
				return deferred.promise;
			}

			function deleteTodo(id) {
				console.log('Removing Point with id '+id);
				var deferred = $q.defer();
				$http.delete(urls.DELETE_TODO_SERVICE_API + id)
				.then(
						function (response) {
							loadAllPoints();
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while removing Point with id :'+id);
							deferred.reject(errResponse);
						}
				);
				return deferred.promise;
			}

			function completeTodo(id) {
				console.log('complete Point with id '+id);
				var deferred = $q.defer();
				$http.put(urls.COMPLETE_TODO_SERVICE_API + id)
				.then(
						function (response) {
							loadAllPoints();
							deferred.resolve(response.data);
						},
						function (errResponse) {
							console.error('Error while complete Point with id :'+id);
							deferred.reject(errResponse);
						}
				);
				return deferred.promise;
			}
		}
		]);