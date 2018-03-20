'use strict';

angular.module('todoApp').controller('TodoController',
    ['TodoService', '$scope', function (TodoService, $scope) {

        var self = this;

        self.getAllPoints = getAllPoints;
        self.createPoint = createPoint;
        self.deleteTodo = deleteTodo;
        self.completeTodo = completeTodo;


        self.successMessage = '';
        self.errorMessage = '';
        self.done = false;

        self.onlyIntegers = /^\d+$/;
        self.onlyNumbers = /^\d+([,.]\d+)?$/;

        function createPoint() {
            console.log('About to create point');
            TodoService.createPoint(self.newtodo)
                .then(
                    function (response) {
                        console.log('point created successfully');
                        self.successMessage = 'point created successfully';
                        self.errorMessage = '';
                        self.done = true;

                        $scope.myForm.$setPristine();
                        self.newtodo = null;
                    },
                    function (errResponse) {
                        console.error('Error while creating User');
                        self.errorMessage = 'Error while creating User: ' + errResponse.data.errorMessage;
                        self.successMessage = '';
                        self.newtodo = null;
                    }
                );
        }

        function deleteTodo(id) {

            console.log('About to remove todo with id ' + id);
            TodoService.deleteTodo(id)
                .then(
                    function () {
                        console.log('todo ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing todo ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

        function completeTodo(id) {

            console.log('About to remove todo with id ' + id);
            TodoService.completeTodo(id)
                .then(
                    function () {
                        console.log('todo ' + id + ' removed successfully');
                    },
                    function (errResponse) {
                        console.error('Error while removing todo ' + id + ', Error :' + errResponse.data);
                    }
                );
        }

        function getAllPoints() {
            return TodoService.getAllPoints();
        }
    }
    ]);