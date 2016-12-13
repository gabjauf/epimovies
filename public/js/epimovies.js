var app = angular.module('Epimovies', []);

var head = "http://localhost:3000/api/movie/getAll";

app.controller('Movies', function($scope, $http){
    $http({
        methode : "GET",
        url : head
    }).then(function mySuccess(response) {
        $scope.res = response.data;
    }, function myError(response) {
        $scope.res = response.statusText;
    });
});

app.controller('Recommendations', function($scope, $http){
    $http({
        methode : "GET",
        url : head
    }).then(function mySuccess(response) {
        $scope.res = response.data;
    }, function myError(response) {
        $scope.res = response.statusText;
    });
})

app.controller('Movie', function($scope, $http){
    $scope.movie = function(id) {
        $http({
            methode : "GET",
            url : head
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