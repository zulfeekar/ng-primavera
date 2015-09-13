
/**
 * ******************************************************************************************************
 *
 *   Route Manager
 *
 *
 * ******************************************************************************************************
 */

(function ( define ) {
    "use strict";


    define([
        ],
        function ( )
        {
            /**
             * Route manageer
             * - to be used in main.js -> angular.config()
             *
             */
            var RouteManager = function ( $stateProvider, $urlRouterProvider)
            {

                $urlRouterProvider.otherwise("/site/home");

                $stateProvider

                    .state('/site/home', {

                        url: '/site/home',

                        templateUrl :function(){
                            return  "assets/view/home.html";
                        },
                        directive:'page',
                        controller:"homeController"
                    })

                    .state('/site/about', {

                        url: '/site/about',

                        templateUrl :function(){
                            return  "assets/view/about.html";
                        },
                        controller:"aboutController"

                    })
            };

            return ["$stateProvider", "$urlRouterProvider", RouteManager ];
        });

}( define ));
