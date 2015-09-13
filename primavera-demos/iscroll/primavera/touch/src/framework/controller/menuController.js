/**
 * Register the About Controller class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var menuController = function($scope)
            {
                console.log("Menu Controller Initialized");
                $scope.content = appModel.getInstance().getData().menu;
            };

            return ["$scope",menuController];
        });

}( define ));