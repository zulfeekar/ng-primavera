/**
 * Register the homeController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['angular','model/appModel'],

        function (angular,appModel)
        {
            /**
             * @constructor
             */
            var homeController = function($scope,$controller,utils)
            {
                angular.extend(this, $controller('abstractPageController', {$scope: $scope})).init({
                        content:appModel.getData().pages.home
                        ,onDestroy:function(){

                        }
                });
            };

            return ["$scope","$controller","utils",homeController];
        });

}( define ));