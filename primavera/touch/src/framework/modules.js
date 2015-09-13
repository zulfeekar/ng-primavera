// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',
            'controller/appController',
            'controller/homeController',
            'controller/aboutController',
            'framework/delegate/appDelegate',
            'framework/manager/eventManager',
            'framework/directive/page'

        ],
        function (angular,appController,homeController,aboutController,appDelegate,eventManager,page)
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .service( "appDelegate", appDelegate)
                .service( "eventManager", eventManager)

                // Controllers
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "aboutController", aboutController)

                // Pages
                .directive( "page", [page])

                console.log("Modules Loaded")

            return moduleName;
        });

}( define));
