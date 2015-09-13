/**
 * Register the Event Controller class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['model/appModel'],

        function (appModel)
        {
            /**
             * @constructor
             */
            var companyController = function($scope)
            {
                console.log("Event Controller Initialized");
                $scope.content = appModel.getInstance().getData().pages[3].content;
            };

            return ["$scope",companyController];
        });

}( define ));