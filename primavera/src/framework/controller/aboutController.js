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
            var aboutController = function($scope,$controller)
            {
                angular.extend(this, $controller('abstractPageController', {$scope: $scope})).init({
                    content:appModel.getData().pages.about
                    ,onDestroy:function(){


                    }
                });
            };

            return ["$scope","$controller",aboutController];
        });

}( define ));