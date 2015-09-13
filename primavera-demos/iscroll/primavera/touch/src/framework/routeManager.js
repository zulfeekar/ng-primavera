
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

                    .state('/site/people', {

                        url: '/site/people',

                        templateUrl :function(){
                            return  "assets/view/people.html";
                        },
                        controller:"peopleController"

                    })

                    .state('/site/company', {

                        url: '/site/company',

                        templateUrl :function(){
                            return  "assets/view/company.html";
                        },
                        controller:"companyController"

                    })

                    .state('/site/menu', {

                        url: '/site/menu',

                        templateUrl :function(){
                            return  "assets/view/menu.html";
                        },
                        controller:"menuController"

                    })

            };

            return ["$stateProvider", "$urlRouterProvider", RouteManager ];
        });

}( define ));
