//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes
weatherApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/home.html',
		controller: 'homeController'
	})
	.when('/forecast',{
		templateUrl: 'pages/forecast.html',
		controller: 'forecastController'
	})
});

//Services
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
})
	
//Controllers

weatherApp.controller('homeController', ['$scope','cityService', function($scope, cityService){
	$scope.city = cityService.city;
    $scope.$watch('city', function(){
        cityService.city = $scope.city;                                         })                                    
                                        
                                         
}]);

weatherApp.controller('forecastController', ['$scope','$resource','cityService', function($scope, $resource, cityService){
	$scope.city = cityService.city;
    $scope.APPID="10b09de700cd853d38370812e15933d9";
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?appid=10b09de700cd853d38370812e15933d9",{
        callback: "JSON_CALLBACK" }, {get: {method : "JSONP"}}
    );
    $scope.weatherResult = 
        $scope.weatherAPI.get({ q: $scope.city, cnt:2});
    
    console.log($scope.weatherResult);
    

}]);