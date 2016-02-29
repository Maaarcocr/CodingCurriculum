var app = angular.module('myApp', ['ngRoute', 'ngStorage'])
app.config(function($routeProvider){
    $routeProvider
    .when('/story', {
        templateUrl: 'templates/story.html',
        controller: 'StoryController'
    })
    .when('/challenge/1', {
      templateUrl: 'templates/challenge1.html',
        controller: 'ChallengeController'
    })
    .otherwise({
        templateUrl: 'templates/start.html',
        controller: 'StartController'
    })    
});
app.controller('StartController', function($scope, $location, $localStorage){
    $scope.name = "";
    $scope.go = function(){
        $location.path('/story');
        delete $localStorage.name;
        $localStorage.name = $scope.name;
    };
});
app.controller('StoryController', function($scope, $localStorage){
    $scope.$storage = $localStorage;
    $scope.choice = "";
    $scope.setChoice = function(choice){
        $scope.choice = choice;
        console.log($scope.choice, $scope.choice === 'yes', $scope.choice === 'no');
    }
});
app.controller('ChallengeController', function($scope, $localStorage){
    $scope.$storage = $localStorage;
    $scope.continue = false;
    var counter = 0;
    $scope.ch1 = function(){
        var doc = document.getElementById("output");
        var result = doc.textContent;
        if (result == "Good Morning, Investigator Maria!\n" && counter === 0){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "Well Done!"
            counter+=1;
        }
        else if (result == "-6\n" && counter === 1){
            $scope.continue = true;
            doc.innerHTML = doc.innerHTML + "Well Done!"
        }
        else{
            doc.innerHTML = doc.innerHTML + "Try again :(\n"
        }
    }
});