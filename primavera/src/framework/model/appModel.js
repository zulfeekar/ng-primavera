(function (define) {
    "use strict";

    define([],

        function () {
            var _instance,

                AppModel = function () {
                    var _data = null,
                        _lang;

                    console.log("AppModel Created");

                    var setLanguage = function (val) {

                        _lang = val;
                    }

                    var getLanguage = function () {

                        return _lang;
                    }

                    var setData = function (val) {

                        _data = val;
                    }

                    var getData = function () {

                        return _data;
                    }

                    // Publish Public API
                    return {
                        setData: setData,
                        getData: getData,
                        setLanguage: setLanguage,
                        getLanguage: getLanguage
                    };
                };


            //
            // Singleton Class Creation
            //
            var instance = function () {

                if (!_instance) {
                    _instance = new AppModel();
                }
                return _instance;
            }


            return  instance();

        });

}(define));