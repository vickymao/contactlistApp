var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("hello from controller.js");
    $http.get('/contactlist').then(function(response) {
        console.log("i got the data i requested");
        $scope.contactlist = response.data;
    });

}]);