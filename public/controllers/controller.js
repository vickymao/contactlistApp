var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("hello from controller.js");
    var refresh = function() {
        $http.get('/contactlist').then(function(response) {
            console.log("i got the data i requested");
            $scope.contactlist = response.data;
            $scope.contact = '';
        });
    };
    refresh();
    $scope.addContact = function() {
        console.log($scope.contact);
        $http.post('/contactlist', $scope.contact).then(function(response) {
            console.log(response.data);
            refresh();
        });

    };
    $scope.remove = function(id) {
        console.log(id);
        $http.delete('/contactlist/' + id).then(function(response) {
            console.log(response.data);
            refresh();
        });
    }


}]);