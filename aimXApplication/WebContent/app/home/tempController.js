
angular.module('app');

app.factory('weatherService', ['$http', '$q', function ($http, $q){
	    var zip = $('#city').val();
    function getWeather (zip) {
      var deferred = $q.defer();
      $http.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + zip + '")&format=json &diagnostics=true&callback=')
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

    app.controller('tempCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
      function fetchWeather(zip) {
        weatherService.getWeather(zip).then(function(data){
          $scope.place = data;
        }); 
      }
      
      fetchWeather('85203');
    }]);

    app.controller('weatherCtrl', ['$scope', 'weatherService', function($scope, weatherService) {
      function fetchWeather(zip) {
        weatherService.getWeather(zip).then(function(data){
          $scope.place = data;
        }); 
      }
      
      fetchWeather('85203');
      
      $scope.findWeather = function(zip) {
        $scope.place = '';
        fetchWeather(zip);
      };
    }]);