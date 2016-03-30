'use strict';
var test = angular.module('app').controller('main.IndexController', mainController);

function mainController($scope, $http) 
{

    $scope.formDeviceData = {areaID:''};
	$scope.formAreaData = {parentID:''};

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
		
		//get all areas
		$http.get('/openApi/areas/area/'+$scope.usertest._id).success(function(data) 
		{
			$scope.areas = data;
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
    $scope.createDevice = function() {
		$scope.formDeviceData.userID = $scope.usertest._id;
        $http.post('/openApi/devices/device/'+$scope.usertest._id, $scope.formDeviceData)
            .success(function(data) {
                $scope.formDeviceData = {areaID:''}; // clear the form so our user is ready to enter another
                $scope.devices = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteDevice = function(id) 
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
	
	//////////////////////////////////////////////////////////////
	
	// when submitting the add form, send the formData to the node API
    $scope.createArea = function() {
		$scope.formAreaData.userID = $scope.usertest._id;
        $http.post('/openApi/areas/area/'+$scope.usertest._id, $scope.formAreaData)
            .success(function(data) {
                $scope.formAreaData = {parentID:''}; // clear the form so our user is ready to enter another
                $scope.areas = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteArea = function(id) 
	{
        $http.delete('/openApi/areas/area/'+$scope.usertest._id+'/'+id).success(function(data) 
		{
			console.log(id);
			$scope.areas = data;
			console.log(data);
		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };
	
};

