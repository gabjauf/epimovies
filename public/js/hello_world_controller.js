var app = angular.module('App', []);

var key = "api_key=37a090ff916d7012771f3df0cbc986f5";
var head = "https://api.themoviedb.org/3/";
var primary_release_date = "primary_release_date.";
var sup = "gt";
var inf = "lt";
var equal = "e";
var and = "&";

app.controller('MoviesCtrl', function($scope, $http){
    $http({
        methode : "GET",
        url : head + "discover/movie?" + primary_release_date + sup + equal + "=2016-10-1" + and + primary_release_date + inf + equal + "=2016-10-26"  + and + key
    }).then(function mySuccess(response) {
        $scope.greeting = response.data;
    }, function myError(response) {
        $scope.greeting = response.statusText;
    });
});

app.controller('MovieCtrl', function($scope, $http){
    $scope.movie = function(id) {
        $http({
            methode : "GET",
            url : head + "movie/" + id + key
        }).then(function mySuccess(response) {
            $scope.m = response.data;
        }, function myError(response) {
            $scope.m = response.statusText;
        });
    }
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