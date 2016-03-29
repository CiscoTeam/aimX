'use strict';
var test = angular.module('app').controller('main.IndexController', mainController);

function mainController($scope, $http) 
{

    $scope.formData = {};

	//when loading page get user ID
	$http.get('/api/users/current').success(function(data) 
	{
		$scope.usertest = data;
		console.log(data);
	
		//get all devices
		$http.get('/openApi/devices/device/'+$scope.usertest._id).success(function(data) 
		{
			$scope.devices = data;
			console.log(data);
		})
		.error(function(data) 
		{
			console.log('Error: ' + data);
		});
	
		
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

    // when submitting the add form, send the formData to the node API
    $scope.createTodo = function() {
		$scope.formData.userID = $scope.usertest._id;
        $http.post('/openApi/devices/device/'+$scope.usertest._id, $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.devices = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) 
	{
        $http.delete('/openApi/devices/device/'+$scope.usertest._id+'/'+id).success(function(data) 
		{
			console.log(id);
			$scope.devices = data;
			console.log(data);
		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };
};

