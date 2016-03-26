/**
 * Register the homeController class with RequireJS
 */
(function( define ) {
    "use strict";

    define( ['angular','model/appModel'],

        function (angular)
        {
            /**
             * @constructor
             */
            var abstractPageController = function($scope,$controller)
            {

                var _this = this;

                function _init(options){

                    angular.extend(_this, $controller('basePageController', {$scope: $scope})).loadData({

                        content : function(){

                            return options.content
                        }
                        ,destroy : options.onDestroy
                    });
                }

                _this.init = _init;

                return _this;
            };

            return ["$scope","$controller",abstractPageController];
        });

}( define ));