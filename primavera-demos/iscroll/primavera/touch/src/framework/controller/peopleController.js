/**
 * Register the Participants Controller class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var peopleController = function($scope)
            {
                console.log("People Controller Initialized");
                $scope.content = appModel.getInstance().getData().pages[2].content;
            };

            return ["$scope",peopleController];
        });

}( define ));