// Defining the configuration
(function( define ) {
    "use strict";

    define( [], function ()
    {
        var _vendorPath = "../vendor/";

        require.config ({

            // We use waitSeconds to avoid the timeout::error
            // Especially when the app runs on a poor network
            waitSeconds : 120,
            appDir  : '',
            baseUrl : 'src',
            paths   :
            {
                // Configure alias to full paths
                "angular" : _vendorPath+'angular/angular',
                "ngAnimate" : _vendorPath+'angular-animate/angular-animate',
                "ngSanitize" : _vendorPath+'angular-sanitize/angular-sanitize',
                "uiRouter" : _vendorPath+'angular-ui-router/release/angular-ui-router',
                "jquery" : _vendorPath+'jquery/jquery.min',
                "tween":_vendorPath+'gsap/src/minified/TweenMax.min',
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
                'ngSanitize': {
                    exports: 'ngSanitize',
                    deps: ['angular']
                },
                'ngAnimate': {

                    'deps': ['angular']
                },
                'uiRouter': {

                    'deps': ['angular']
                },
                'tween':{
                    'exports':'TweenMax'
                }
            },

            priority: ['angular']
        });

        return require.config;

    });

}( define ));
