// Register Modules

(function ( define ) {
    "use strict";

    define([
            'angular',
            'controller/appController',
            'controller/homeController',
            'controller/footerController',
            'controller/aboutController',
            'controller/peopleController',
            'controller/companyController',
            'controller/menuController',
            'framework/delegate/appDelegate',
            'framework/manager/eventManager',
            'framework/directive/page'

        ],
        function (angular,appController,homeController,footerController,aboutController,peopleController,companyController,menuController, appDelegate,eventManager,page)
        {
            var moduleName = "app.modules";
            angular.module(moduleName,[])

                // Services
                .service( "appDelegate", appDelegate)
                .service( "eventManager", eventManager)

                // Controllers
                .controller( "appController", appController)
                .controller( "homeController", homeController)
                .controller( "footerController", footerController)
                .controller( "aboutController", aboutController)
                .controller( "companyController", companyController)
                .controller( "peopleController", peopleController)
                .controller( "menuController", menuController)

                // Pages
                .directive( "page", ["$timeout",page])

                console.log("Modules Loaded")

            return moduleName;
        });

}( define));
