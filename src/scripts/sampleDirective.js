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

