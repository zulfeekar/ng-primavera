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
    define( ['angular','IScroll'], function (angular,IScroll)
    {

        return function($timeout){


            return {
                restrict: 'A',
                replace: false,
                scope:{},
                link: function($scope, $element, $attrs) {

                    var _myScroll = null, _timeout;

                    function buildScroll(){

                        clearTimeout(_timeout);
                        _timeout = null;

                        _myScroll = new IScroll($element[0], {
                            useTransition: true,
                            probeType:3,
                            hideScrollbar: true,
                            scrollbars: true,
                            mouseWheel: true,
                            interactiveScrollbars: true,
                            shrinkScrollbars: 'scale',
                            fadeScrollbars: true,
                            preventDefaultException: { tagName:/.*/ }
                        });
                    }


                    _timeout = $timeout(buildScroll,300);


                    $scope.$on('$destroy', function() {

                        if(_timeout)clearTimeout(_timeout);

                        _timeout = $timeout(function(){

                            clearTimeout(_timeout);
                            _timeout = null;

                            if(_myScroll){
                                _myScroll.destroy();
                                _myScroll=null;
                            }

                        },1500);
                    });
                }
            }
        }

    });

}( define ));
