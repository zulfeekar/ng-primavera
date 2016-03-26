/**
 *
 *  This Page Directive uses RequireJS to `define` a AngularJS constructor function
 *  with its dependencies.
 *
 *  @author  zulfeekar cheriyampurath
 *  @date    july, 2014
 *
 */
(function( define ) {
    "use strict";
    /**
     * Register the component class with RequireJS
     */
    define( ['jquery','tween','model/appModel'], function ($,tween,appModel)
    {

        return function($window,$timeout,eventManager){


            return {
                restrict: 'A',
                replace: false,
                scope:{},
                template:function($element){

                    return $($element).html();

                },
                link: function($scope, $element, $attrs) {

                    var _logo = $($element).find('header .logo'),
                        _w=$window,
                        _maindataLoded=false;

                    function _onMainDataLoaded(event)
                    {
                        event.preventDefault();

                        var tout=$timeout(function(){

                            if(tout){clearTimeout(tout);tout=null};
                            tween.to(_logo,0.8,{y:-($scope.windowHeight *.5)+74+"px",ease:Expo.easeInOut});
                            _maindataLoded = true;

                        },800);
                    };


                    function _onResizeWindow(event)
                    {
                        event.preventDefault();
                        $scope.$apply();
                        console.log(_maindataLoded);
                        if(!_maindataLoded) return;
                        tween.set(_logo,{y:-($scope.windowHeight *.5)+74+"px"});
                    };


                    $scope.getWindowDimensions = function(){

                        return{'h': $(_w).innerHeight(),'w': $(_w).innerWidth()};
                    };

                    $scope.$watch($scope.getWindowDimensions, function (newValue, oldValue) {

                        $scope.windowHeight = newValue.h;
                        $scope.windowWidth = newValue.w;

                        $scope.$on(eventManager.WINDOW_RESIZE, {w:newValue.w,h:newValue.h});

                    }, true);


                    $(_w).resize(_onResizeWindow);
                    $scope.$on(eventManager.MAIN_DATA_LOADED, _onMainDataLoaded);
                    $scope.$on('$destroy', function(){});
                }
            }
        }

    });

}( define ));
