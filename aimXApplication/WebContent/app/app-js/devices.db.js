'use strict';
var test = angular.module('app').controller('main.IndexController', mainController);


function mainController($scope, $http) 
{

    $scope.formDeviceData = {areaID:''};
	$scope.formAreaData = {parentID:''};
	$scope.areas;
	
	var socket = io();
	socket.on('dbUpdate', function (data) {  
		reloadDB();
	});

	function reloadDB()
	{
		$http.get('/api/users/current').success(function(data) 
		{
			$scope.usertest = data;
			//console.log(data);
		
			//get all devices
			$http.get('/openApi/devices/device/'+$scope.usertest._id).success(function(data) 
			{
				$scope.devices = data;
				//console.log(data);
			})
			.error(function(data) 
			{
				console.log('Error: ' + data);
			});
			
			//get all areas
			$http.get('/openApi/areas/area/'+$scope.usertest._id).success(function(data) 
			{
				$scope.areas = data;
				//console.log(data);
			})
			.error(function(data) 
			{
				console.log('Error: ' + data);
			});
			
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});	
		
	}
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

    // delete a device after checking it
    $scope.deleteDevice = function(id) 
	{
        $http.delete('/openApi/devices/device/'+$scope.usertest._id+'/'+id).success(function(data) 
		{
			console.log(id);
			$scope.devices = data;
			console.log(data);
			$scope.deviceInfo = null;
			angular.element('.deviceInfoForm').css('display', 'none');
		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };
	
	// update a device after checking it
    $scope.updateDevice = function() 
	{
		$scope.deviceInfoSend = $scope.deviceInfo
        $http.put('/openApi/devices/deviceUpdate/'+$scope.usertest._id+'/'+$scope.deviceInfoSend._id, $scope.deviceInfoSend).success(function(data) 
		{
			console.log($scope.deviceInfo._id);
			$scope.devices = data;
			console.log(data);
			
			//load updated device after updated
			var id = $scope.deviceInfo._id;
			$scope.deviceInfo._id = null;
			angular.element('.deviceInfoForm').css('display', 'none');
			angular.forEach($scope.devices, function(device) 
			{
				if(device._id == id)
				{
					$scope.deviceInfo = angular.copy(device);
					angular.element('.deviceInfoForm').css('display', 'block');
				}
			});

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

    // delete a area after checking it
    $scope.deleteArea = function(id) 
	{
        $http.delete('/openApi/areas/area/'+$scope.usertest._id+'/'+id).success(function(data) 
		{
			console.log(id);
			$scope.areas = data;
			console.log(data);
			$scope.areaInfo = null;
			angular.element('.areaInfoForm').css('display', 'none');
		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };
	
	// update a area after checking it
    $scope.updateArea = function() 
	{
		$scope.areaInfoSend = $scope.areaInfo
        $http.put('/openApi/areas/areaUpdate/'+$scope.usertest._id+'/'+$scope.areaInfoSend._id, $scope.areaInfoSend).success(function(data) 
		{
			console.log($scope.areaInfo._id);
			$scope.areas = data;
			console.log(data);
			
			//load updated device after updated
			var id = $scope.areaInfo._id;
			$scope.areaInfo._id = null;
			angular.element('.areaInfoForm').css('display', 'none');
			angular.forEach($scope.areas, function(area) 
			{
				if(area._id == id)
				{
					$scope.areaInfo = angular.copy(area);
					angular.element('.areaInfoForm').css('display', 'block');
				}
			});

		}).error(function(data) 
		{
			console.log('Error: ' + data);
		});
    };
	
	//Get device info on click
	$scope.getDeviceInfo = function(device) 
	{
			console.log(device._id);
			$scope.deviceInfo = angular.copy(device);
			angular.element('.areaInfoForm').css('display', 'none');
			angular.element('.deviceInfoForm').css('display', 'block');

			//device.document.getElementsByClassName("deviceInfoForm").style.visibility = "visible";
    };
	
	//Get area info on click
	$scope.getAreaInfo = function(area) 
	{
			console.log(area._id);
			$scope.areaInfo = angular.copy(area);
			angular.element('.deviceInfoForm').css('display', 'none');
			angular.element('.areaInfoForm').css('display', 'block');
    };
	
	$scope.filterAreaExists = function(object) 
	{
		if(object.areaID == null)
		{
			return (true);
		}
		else
		{
			var found = false;
			angular.forEach($scope.areas, function(area) 
			{
				if(object.areaID == area._id)
				{
					found = true;
				}
			});
			return (!found);
		}
		return (false);
	};
	
	$scope.filterParentExists = function(object) 
	{
		if(object.parentID == null)
		{
			return (true);
		}
		else
		{
			var found = false;
			angular.forEach($scope.areas, function(area) 
			{
				if(object.parentID == area._id)
				{
					found = true;
				}
			});
			return (!found);
		}
		return (false);
	};
};

