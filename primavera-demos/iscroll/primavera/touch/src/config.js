// Defining the configuration
(function( define ) {
    "use strict";

    define( [], function ()
    {
        var _vendorPath = "../../vendor/";

        require.config ({

            // We use waitSeconds to avoid the timeout::error
            // Especially when the app runs on a poor network
            waitSeconds : 120,
            appDir  : '',
            baseUrl : '../touch/src',
            paths   :
            {
                // Configure alias to full paths
                "angular" : _vendorPath+'angular/angular',
                "ngAnimate" : _vendorPath+'angular-animate/angular-animate',
                "uiRouter" : _vendorPath+'angular-ui-router/release/angular-ui-router',
                'IScroll' : _vendorPath+"iscroll/build/iscroll-probe",
                "framework":"./framework",
                "controller":"./framework/controller",
                "model":"./framework/model"
            },

            urlArgs: 'v=1.0',

            shim    :
            {
                'angular': {

                    'exports': 'angular'
                },
                'ngAnimate': {

                    'deps': ['angular']
                },
                'IScroll': {
                    exports: 'IScroll'

                },
                'uiRouter': {

                    'deps': ['angular']
                }
            },

            priority: ['angular']
        });

        return require.config;

    });

}( define ));
