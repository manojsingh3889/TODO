var app = angular.module('crudApp',['ui.router','ngStorage']);

app.constant('urls', {
    BASE: 'http://localhost:8080/Todo',
    TODO_SERVICE_API : 'http://localhost:8080/Todo/api/points/',
    CREATE_TODO_SERVICE_API : 'http://localhost:8080/Todo/api/create/',
    DELETE_TODO_SERVICE_API : 'http://localhost:8080/Todo/api/delete/',
    COMPLETE_TODO_SERVICE_API : 'http://localhost:8080/Todo/api/complete/',
});

app.config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'partials/todo',
                controller:'TodoController',
                controllerAs:'ctrl',
                resolve: {
                    users: function ($q, TodoService) {
                        console.log('Load all points');
                        var deferred = $q.defer();
                        TodoService.loadAllPoints().then(deferred.resolve, deferred.resolve);
                        return deferred.promise;
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    }]);

