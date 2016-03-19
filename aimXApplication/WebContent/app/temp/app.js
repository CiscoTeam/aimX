
angular.module('weatherApp', []);

app.factory('weatherService', ['$http', '$q', function ($http, $q){
    function getWeather (zip) {
      var deferred = $q.defer();
      $http.get('https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20weather.forecast%20WHERE%20location%3D%22' + zip + '%22&format=json&diagnostics=true&callback=')
        .success(function(data){
          deferred.resolve(data.query.results.channel);
        })
        .error(function(err){
          console.log('Error retrieving markets');
          deferred.reject(err);
        });
      return deferred.promise;
    }
    return {
      getWeather: getWeather
    };
    }]);

    app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
      function fetchWeather(zip) {
        weatherService.getWeather(zip).then(function(data){
          $scope.place = data;
        }); 
      }
      
      fetchWeather('84105');
    }]);


    app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
      function fetchWeather(zip) {
        weatherService.getWeather(zip).then(function(data){
          $scope.place = data;
        }); 
      }
      
      fetchWeather('85142');
      
      $scope.findWeather = function(zip) {
        $scope.place = '';
        fetchWeather(zip);
      };
    }]);
	
	