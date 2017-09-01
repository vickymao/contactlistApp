var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            template: "<h1>Main</h1><p>Click on the links to change this content</p>"
        }).when("/contactlistTool", {
            templateUrl: "asset/contactlistTool.html"
        }).when("/todoTool", {
            templateUrl: "asset/todoTool.html"
        });
});
myApp.controller('ToolsCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.contactlistTool = function(path) {
        $location.path(path);
    };
    $scope.todoTool = function(path) {
        $location.path(path);
    };
}]);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("hello from contactcontroller");
    var refresh = function() {
        $http.get('/contactlist').then(function(response) {
            console.log("i got the data i requested");
            $scope.contactlist = response.data;
            if ($scope.contact) {
                $scope.contact.name = '';
                $scope.contact.email = '';
                $scope.contact.telephone = '';
            }

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
    };
    $scope.edit = function(id) {
        console.log(id);
        $http.get('/contactlist/' + id).then(function(response) {
            console.log(response.data);
            $scope.contact = response.data;

        });
    };

    $scope.update = function() {
        console.log($scope.contact._id);
        $http.put('/contactlist/' + $scope.contact._id, $scope.contact).then(function(response) {
            console.log(response.data);
            refresh();
        });

    };

}]);
myApp.controller('TodoCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("hello from todocontroller");
    var refresh = function() {
        $http.get('/todolist').then(function(response) {
            console.log("i got the data i requested");
            $scope.todolist = response.data.todolist;
            $scope.donelist = response.data.donelist;
            console.log(response.data);
            if ($scope.todo) {
                $scope.todo.title = '';
                $scope.todo.beginning = '';
                $scope.todo.deadline = '';
                $scope.todo.description = '';

            }

        });
    };
    refresh();
    $scope.addTodo = function() {
        console.log($scope.todo);
        $http.post('/todolist', $scope.todo).then(function(response) {
            console.log(response.data);
            refresh();
        });

    };
    $scope.remove = function(id) {
        console.log(id);
        var txt;
        var r = confirm("do you realy remove this todo?");
        if (r == true) {
            console.log('remove beginning');
            $http.delete('/todolist/' + id).then(function(response) {
                console.log(response.data);
                console.log('remove done');
                refresh();
            });
        }

    };
    $scope.edit = function(id) {
        console.log(id);
        $http.get('/todolist/' + id).then(function(response) {
            console.log(response.data);
            $scope.todo = response.data;

        });
    };

    $scope.update = function() {
        console.log($scope.todo._id);
        $http.put('/todolist/' + $scope.todo._id, $scope.todo).then(function(response) {
            console.log(response.data);
            refresh();
        });

    };

    $scope.done = function(id) {
        $http.post('/todolist/done/' + id).then(function(response) {
            refresh();
        });
    };
}]);