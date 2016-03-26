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
            var basePagController = function($scope,eventManager)
            {
                var _this = this,_options;

                function _loadData(options){

                    var _options = options || {};
                    _this._content=_options.content || {};
                    _this._destroy=_options.destroy || function(){};

                    $scope.content = _this._content();

                    return _this;
                }

                function _reloadData(){

                    $scope.content = _this._content();
                };


                function _onDestroy(){

                    _options = null;
                    $scope.content = null;
                    _this._destroy();
                    _this = null;
                };

                _this.loadData = _loadData;

                $scope.$on(eventManager.LANGUAGE_DATA_CHANGED,_reloadData);
                $scope.$on('$destroy',_onDestroy);

                return _this;
            };

            return ["$scope","eventManager",basePagController];
        });

}( define ));