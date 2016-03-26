// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',

            // Controller
            'controller/basePageController',
            'controller/abstractPageController',
            'controller/appController',
            'controller/homeController',
            'controller/aboutController',

            // Service
            'framework/delegate/appDelegate',
            'framework/manager/eventManager',
            'framework/service/utils',


            // Animation
            'framework/manager/transitionManager',


            // Directive
            'framework/directive/backgroundImage',
            'framework/directive/repeatItem',
            'framework/directive/mainNavigation',
            'framework/directive/app',
            'framework/directive/page',

            //Factory
            'framework/factory/bennadelImagePreloader'


        ],
        function (angular,
                  basePageController,abstractPageController,appController,homeController,aboutController,
                  appDelegate,eventManager,utils,
                  transitionManager,
                  backgroundImage,repeatItem,mainNavigation,app,page,
                  bennadelImagePreloader)
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .service( "appDelegate", appDelegate)
                .service( "eventManager", eventManager)
                .service( "utils", utils)

                // Page Transition Animation
                .animation('.main-ui-view', transitionManager)

                // Factory
                .factory("preloader", bennadelImagePreloader)

                // Controllers
                .controller( "basePageController", basePageController)
                .controller( "abstractPageController", abstractPageController)
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "aboutController", aboutController)

                // Directives
                .directive("backImg", [backgroundImage])
                .directive( "repeatItem",["$window","$timeout",repeatItem])
                .directive( "menu", ["$window","$timeout","eventManager",mainNavigation])
                .directive( "app", ["$window","$timeout","eventManager",app])
                .directive( "page", [page])

                console.log("Modules Loaded");

            return moduleName;
        });

}( define));
