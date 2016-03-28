// public/core.js
'use strict';
var scotchTodo = angular.module('testname', [])

/*
.run(run);


function run($http, $rootScope, $window) 
{
	console.info("run");
	// add JWT token as default auth header
	$http.defaults.headers.common['Authorization'] = 'Bearer ' + $window.jwtToken;

	// update active tab on state change
	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
		$rootScope.activeTab = toState.data.activeTab;
	});	
}

// manually bootstrap angular after the JWT token is retrieved from the server
$(function () 
{
	console.info("function");
	// get JWT token from server
	$.get('/app/token', function (token) {
		window.jwtToken = token;

		angular.bootstrap(document, ['scotchTodo']);
	});
});	
	*/

function mainController($scope, $http) 
{

	console.info("main");
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/test/devices/get')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/test/devices/post', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) 
	{
        $http.delete('/test/devices/delete/' + id).success(function(data) 
		{
			console.log(id);
			$scope.todos = data;
			console.log(data);
		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };

	/////////////////
	$http.get('/api/users/current').success(function(data) 
	{
		$scope.user = data;
		console.log(data);
		console.log($scope.user.firstName);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

};

