/**
 * Register the AppController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * AppController
             * @constructor
             */
            var appController = function($rootScope,$urlRouter,appDelegate,eventManager)
            {
                console.log("AppController Initialized");
                var _appModel = appModel.getInstance(),_loaded=false;


                // private methods
                function loadData() {

                    appDelegate.loadData('../api/data.json')
                    .then( function( response )
                    {
                        console.log("data loaded")
                        _appModel.setData(response.data);
                        _loaded = true;
                        eventManager.sendMessage(eventManager.MAIN_DATA_LOADED);
                        $urlRouter.sync();

                    });
                }


                // prevents the startchange event if the data is not loaded

                $rootScope.$on('$stateChangeStart',function(event){

                    if(!_loaded){
                        event.preventDefault();
                        return false;
                    }
                });


                // Loads the data
                loadData();

            };

            return ["$rootScope","$urlRouter","appDelegate","eventManager",appController];
        });

}( define ));