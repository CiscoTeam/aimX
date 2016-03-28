// public/core.js
'use strict';

var test = angular.module('testname', [])


function mainController($scope, $http) 
{

	console.info("main");
    $scope.formData = {};


	$http.get('/api/users/current').success(function(data) 
	{
		$scope.usertest = data;
		console.log(data);
		console.log($scope.usertest.firstName);
	
	// when landing on the page, get all todos and show them
    $http.get('/test/devices/get/'+$scope.usertest._id)

        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

	
		
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
		$scope.formData.userID = $scope.usertest._id;
		console.info("create"+ $scope.formData.userID);
        $http.post('/test/devices/post/'+$scope.usertest._id, $scope.formData, {name : "hello"})

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

        $http.delete('/test/devices/delete/' + id+'/'+$scope.usertest._id).success(function(data) 
		{
			console.log(id);
			$scope.todos = data;
			console.log(data);
		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };


};

