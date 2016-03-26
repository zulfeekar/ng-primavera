/**
 * Register the AppController class with RequireJS
 */
(function (define) {
    "use strict";

    define(['angular', 'model/appModel'],

        function (angular, appModel) {
            /**
             * AppController
             * @constructor
             */
            var appController = function ($rootScope, $scope, $urlRouter, $state, $timeout,$window,appDelegate, eventManager,preloader) {
                console.log("AppController Initialized");

                var _appModel = appModel,
                    _currPage=null,
                    _loaded = false,
                    _lang = String($window.location.hash).split('/')[1], _lang = (_lang && _lang.length > 1) ? _lang : "it";
                    _appModel.setLanguage(_lang);
                    _lang = _appModel.getLanguage();


                function fireDataLoaded(langStr,currPage){

                    _loaded = true;

                    if(currPage)
                    {
                        $state.go(currPage, {langId: langStr});
                    }
                    else
                    {
                        var tout = $timeout(function(){

                            clearTimeout(tout);
                            $urlRouter.sync();

                        },1500);
                    }

                    if(currPage){eventManager.sendMessage(eventManager.LANGUAGE_CHANGED);}


                    eventManager.sendMessage(eventManager.MAIN_DATA_LOADED);
                }

                // private methods
                function _loadData(langStr,currPage) {

                    appDelegate.loadData('./api/' + langStr + '/data.json')

                        .then(function (response) {

                            _appModel.setData(response.data);

                            if(!currPage){
                                // Preload the images; then, update display when returned.
                                preloader.preloadImages(_appModel.getData().cacheFiles ).then(
                                    function handleResolve( imageLocations ) {
                                        // Loading was successful.
                                        $scope.isLoading = false;
                                        $scope.isSuccessful = true;
                                        console.info( "Preload Successful" );
                                        fireDataLoaded(langStr,currPage);
                                    },
                                    function handleReject( imageLocation ) {
                                        // Loading failed on at least one image.
                                        $scope.isLoading = false;
                                        $scope.isSuccessful = false;
                                        console.error( "Image Failed", imageLocation );
                                        console.info( "Preload Failure" );
                                        fireDataLoaded(langStr,currPage);
                                    },
                                    function handleNotify( event ) {
                                        $scope.percentLoaded = event.percent;
                                        //console.info( "Percent loaded:", event.percent );
                                        eventManager.sendMessage(eventManager.ON_DATA_PROGRESS,event.percent);
                                    }
                                );


                            }else
                            {
                                fireDataLoaded(langStr,currPage);

                            }

                        });
                }


                function _onLanguageMenuNavigation(event,data){

                    if(_appModel.getLanguage()!==data){
                        _appModel.setLanguage(data);
                        _loadData(data,_currPage);
                    }
                };



                function _onMainMenuNavigation(event, data){

                    $state.go(":langId/" + data, {langId: _appModel.getLanguage()});
                }


                // prevents the startchange event if the data is not loaded
                $rootScope.$on('$stateChangeStart', function (event, page, params){


                    if (!_loaded) {
                        event.preventDefault();
                        return false;
                    }
                });

                $rootScope.$on('$stateChangeSuccess', function (event, page, params){

                    _currPage = page.name;
                    var _ln = page.url.split('/');
                    eventManager.sendMessage(eventManager.MAIN_ROUTER_CHANGED, {lang: params.langId, page: _ln[_ln.length - 1]});
                    $rootScope.pageTitle = String(_ln[_ln.length - 1]).toUpperCase();
                });


                // Loads the data
                console.log("current language ",_lang)
                _loadData(_lang);


                $rootScope.$on(eventManager.MAIN_MENU_NAVIGATION, _onMainMenuNavigation);
                $rootScope.$on(eventManager.LANGUAGE_MENU_NAVIGATION, _onLanguageMenuNavigation);

            };

            return ["$rootScope", "$scope", "$urlRouter", "$state", "$timeout","$window", "appDelegate", "eventManager", "preloader",appController];
        });

}(define));