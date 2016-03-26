/**
 * Now let's start our Primavera app...
 * which uses RequireJS to load  packages and code
 *
 */
define(['angular', 'ngSanitize', 'ngAnimate', 'uiRouter','framework/modules','framework/routeManager'], function(angular,ngSanitize,ngAnimate,uiRouter,modules,routeManager) {

    var app, appName = 'app';
    /**
     * Start the main application
     */
    var initialize = function(document,isTouch) {

        app = angular.module(appName, ["ngAnimate","ngSanitize","ui.router",modules])

        // configure routeManager
        .config(routeManager)

        // configure constant value
        .constant('settings', {
            isTouch: isTouch
        });


        angular.element(document).ready(function() {
            console.log('App: bootstrapping');
            angular.bootstrap(document, [appName]);
        });

    }
    return {
        init: initialize
    };
});