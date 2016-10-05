var app = angular.module('App', []);

var key = "api_key=37a090ff916d7012771f3df0cbc986f5";
var head = "https://api.themoviedb.org/3/discover/movie?";
var primary_release_date = "primary_release_date.";
var sup = "gt";
var inf = "lt";
var equal = "e";
var and = "&";

app.controller('Controller', function($scope, $http){
    $http({
        methode : "GET",
        url : head + primary_release_date + sup + equal + "=2016-09-20" + and + primary_release_date + inf + equal + "=2016-10-04" + and + key
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