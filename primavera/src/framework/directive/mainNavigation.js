/**
 *
 *  This Page Directive uses RequireJS to `define` a AngularJS constructor function
 *  with its dependencies.
 *
 *  @author  zulfeekar cheriyampurath
 *  @date    july, 2014
 *
 */
(function( define ) {
    "use strict";
    /**
     * Register the component class with RequireJS
     */
    define( ['jquery','tween','model/appModel'], function ($,tween,appModel)
    {

        return function($window,$timeout,eventManager){


            return {
                restrict: 'EA',
                replace: false,
                scope:{

                },
                template:function($element){
                    return $($element).html();
                },
                link: function($scope, $element, $attrs) {

                    var _timeoutDur=1800,
                        _currNavObject;


                    function _getId(label,elCls)
                    {
                        var _id=-1;

                        $.each($(elCls).find('li'),function(index,object){

                            if($(object).data('label').toLowerCase()==label.toLowerCase()){

                                _id = index;
                            }
                        });

                        return _id;
                    };

                    function _manageNavigation(){

                        $($($element).find('.page-navigation li')[_getId(_currNavObject.page,'.page-navigation')])
                            .addClass('active')
                            .siblings().removeClass('active');

                        $($($element).find('.language-navigation li')[_getId(_currNavObject.lang,'.language-navigation')])
                            .addClass('active')
                            .siblings().removeClass('active');
                    }

                    function _onMainRouterChanged(event,data)
                    {
                        event.preventDefault();
                        _currNavObject = data;

                        var  tout = $timeout(function(){
                            $window.clearTimeout(tout);
                            tout=null;
                            _manageNavigation();
                        },300);
                    };



                    function _onLanguageChanged()
                    {
                        _timeoutDur = 800;
                        tween.to($element,0.5,{y:-200,ease:Expo.easeInOut});
                    };




                    function _onDataLoaded()
                    {
                        $($element).removeClass('base-hide');

                        var tout = $timeout(function(){

                            $scope.pageNavigationData = appModel.getData().mainmenu;
                            $scope.languageNavigationData = appModel.getData().languages;
                            if(tout)
                            {
                                clearTimeout(tout);
                                tout = null;
                            }
                            tween.set($element,{y:-200});
                            tween.to($element,1,{y:0,ease:Expo.easeInOut});

                        },_timeoutDur);

                    };






                    $scope.build=function()
                    {
                        _manageNavigation();
                    };


                    $scope.onLanguageSwitch=function(val)
                    {
                        eventManager.sendMessage(eventManager.LANGUAGE_MENU_NAVIGATION,val);
                    };


                    $scope.onPageNavClick=function(val)
                    {
                        eventManager.sendMessage(eventManager.MAIN_MENU_NAVIGATION,val);
                    };

                    $scope.$on(eventManager.MAIN_DATA_LOADED, _onDataLoaded);
                    $scope.$on(eventManager.LANGUAGE_CHANGED, _onLanguageChanged);
                    $scope.$on(eventManager.MAIN_ROUTER_CHANGED,_onMainRouterChanged);

                    $scope.$on('$destroy', function(){});
                }
            }
        }

    });

}( define ));
