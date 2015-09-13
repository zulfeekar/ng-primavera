/**
 * ******************************************************************************************************
 *
 *   Event Manager
 *
 * ******************************************************************************************************
 */
(function ( define ) {

    "use strict";

    define([
        ],
        function ( )
        {

            var EventManager = function ($rootScope)
            {
                // @Public Static Variable
                this.MAIN_DATA_LOADED = "MAIN_DATA_LOADED";


                //@Public Method
                this.sendMessage = function(value,data){

                    $rootScope.$broadcast(value,data);
                }
            };

            return [ "$rootScope",  EventManager ];
        });

}( define ));
