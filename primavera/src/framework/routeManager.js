/**
 * ******************************************************************************************************
 *
 *   Route Manager
 *
 *
 * ******************************************************************************************************
 */

(function (define) {
    "use strict";


    define([
        ],
        function () {
            /**
             * Route manageer
             * - to be used in main.js -> angular.config()
             *
             */
            var RouteManager = function ($stateProvider, $urlRouterProvider, $locationProvider) {

                $locationProvider.hashPrefix('!');
                $urlRouterProvider.otherwise('/');
                $urlRouterProvider.when('/', '/en/home');

                $stateProvider
                    .state(':langId/home', {
                        url: '/:langId/home',
                        templateUrl: function () {
                            return  "assets/view/home.html";
                        },
                        directive: 'page',
                        controller: "homeController"
                    })
                    .state(':langId/about', {
                        url: '/:langId/about',
                        templateUrl: function () {
                            return  "assets/view/about.html";
                        },
                        directive: 'page',
                        controller: "aboutController"
                    })
            };

            return ["$stateProvider", "$urlRouterProvider", "$locationProvider", RouteManager ];
        });

}(define));
