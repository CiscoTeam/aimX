var app = angular.module('app', [])
app.controller('dateController', function ($scope) {
$scope.CurrentDate = new Date();
});