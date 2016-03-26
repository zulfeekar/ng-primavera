/**
 *
 *  This Page Directive uses RequireJS to `define` a AngularJS constructor function
 *  with its dependencies.
 *
 *  @author  zulfeekar cheriyampurath
 *  @date    july, 2014
 *
 */
(function (define) {
    "use strict";
    /**
     * Register the component class with RequireJS
     */
    define([], function () {

        return function () {


            return {
                restrict: 'EA',
                replace: false,
                scope: {backImg: '@'},
                link: function ($scope, $element, $attrs) {

                    $scope.$watch("backImg", function () {

                        $element.css({
                            'background-image': 'url(' + $attrs.backImg + ')',
                            '-moz-background-size': 'cover',
                            '-o-background-size': 'cover',
                            '-webkit-background-size': 'cover',
                            'background-size': 'cover',
                            'background-position': '50%'
                        });
                    });
                }
            }
        }

    });

}(define));
