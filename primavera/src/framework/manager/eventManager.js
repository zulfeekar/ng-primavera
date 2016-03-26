/**
 * ******************************************************************************************************
 *
 *   Event Manager
 *
 * ******************************************************************************************************
 */
(function (define) {

    "use strict";

    define([
        ],
        function () {

            var EventManager = function ($rootScope) {
                // @Public Static Variable
                this.MAIN_DATA_LOADED = "MAIN_DATA_LOADED";
                this.WINDOW_RESIZE = "WINDOW_RESIZE";
                this.TRANSITION_IN_DONE = "TRANSITION_IN_DONE";
                this.TRANSITION_OUT_DONE = "TRANSITION_OUT_DONE";
                this.MAIN_ROUTER_CHANGED = "MAIN_ROUTER_CHANGED";
                this.MAIN_MENU_NAVIGATION = "MAIN_MENU_NAVIGATION";
                this.LANGUAGE_MENU_NAVIGATION = "LANGUAGE_MENU_NAVIGATION";
                this.LANGUAGE_DATA_CHANGED = "LANGUAGE_DATA_CHANGED";
                this.ON_DATA_PROGRESS = "ON_DATA_PROGRESS";
                this.LANGUAGE_CHANGED = "LANGUAGE_CHANGED";

                //@Public Method
                this.sendMessage = function (value, data) {

                    $rootScope.$broadcast(value, data);
                }
            };

            return [ "$rootScope", EventManager ];
        });

}(define));
