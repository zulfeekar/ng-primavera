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
    define( [], function ()
    {

        return function(){


            return {
                restrict: 'A',
                replace: false,
                scope:{},
                link: function($scope, $element, $attrs) {

                    /*
                     *
                     * Define the private variables here
                     * example:
                     * var _scroll;
                     *
                     * */
                     function build(){

                        /*
                         *
                         * Create Instances here the objects here
                         * example:
                         * _scroll = new Iscroll();
                         *
                         * */
                    }


                    $scope.$on('$destroy', function() {

                        /*
                        *
                        * Destroy the objects here
                        *
                        *  example:
                        *  if(_scroll)_scroll.destroy();
                        *
                        *
                        * */
                    });
                }
            }
        }

    });

}( define ));
