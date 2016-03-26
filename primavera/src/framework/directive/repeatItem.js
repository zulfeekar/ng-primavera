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

        return function ($window,$timeout) {

            return {
                restrict: 'EA',
                link: function ($scope) {

                    var _tout;

                    function onTimeOut(){

                        if(_tout)
                        {
                            $window.clearTimeout(_tout);
                            _tout = null;
                        }

                        $scope.build();
                    };

                    if ($scope.$last){

                        _tout = $timeout(onTimeOut,200);
                    }
                }
            }
        }

    });

}(define));
