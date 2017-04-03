'use strict';

 var app = angular.module('app', ['ui.router']);

app.config(['$stateProvider','$locationProvider', '$httpProvider','$urlRouterProvider',
    function($stateProvider, $locationProvider, $httpProvider, $urlRouterProvider) {
        $stateProvider
            .state('sample1',{
                url:'/sample1',
                templateUrl:'../views/sample1.html',
                controller: 'SampleControllerOne',
            })
            .state('sample2',{
                url:'/sample2',
                templateUrl:'../views/sample2.html',
                controller: 'SampleControllerTwo',
            });

        $urlRouterProvider.otherwise('/sample1');

    }
]);


"use strict";

app.controller('SampleControllerOne', ['$scope', function($scope) {

    //Controller code here.
    $scope.text = "This text is from SampleControllerOne";

}]);


"use strict";


app.controller('SampleControllerTwo', ['$scope', function($scope) {

    //Controller code here.
    $scope.text = "This text is from SampleControllerTwo";
}]);
'use strict'

//sample service
app.service('sampleService', function() {
    var self = this;

    self.task = function(data) {
        //Sample Function
    };
});


app.directive('sampleDirective', function() {
    return {
        restrict: 'E',
        template:'<button ng-click="click()">I\'m a directive</button>',

        link: function(scope, el, attrs) {

            scope.click = function(){
                alert('Hi there!');
            }
        }
    };
});

