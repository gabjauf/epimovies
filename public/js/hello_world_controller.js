var app = angular.module('App', []);

var key = "37a090ff916d7012771f3df0cbc986f5";
var head = "https://api.themoviedb.org/3/discover/";

app.controller('Controller', function($scope, $http){
    $http({
        methode : "GET",
        url : head + "movie?primary_release_date.gte=2016-09-20&primary_release_date.lte=2016-10-04&api_key=" + key
    }).then(function mySuccess(response) {
        $scope.greeting = response.data;
    }, function myError(response) {
        $scope.greeting = response.statusText;
    });
});

app.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);
        for (var i=0; i<total; i++) {
          input.push(i);
        }
        return input;
    };
});