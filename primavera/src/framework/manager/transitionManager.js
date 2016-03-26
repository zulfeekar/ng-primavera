/**
 * ******************************************************************************************************
 *
 *   Event Manager
 *
 * ******************************************************************************************************
 */
(function (define) {

    "use strict";

    define(['jquery', 'tween'],
        function ($, tween) {

            var TransitionManager = function (eventManager) {
                return {
                    enter: function (element, done) {
                        var tgt = $(element);
                        tween.set(tgt, {pointerEvents: 'none', xPercent: 100, zIndex: 0});
                        //tween.set(tgt, {pointerEvents: 'auto'});
                        tween.to(tgt, 1,{xPercent:0,ease:Expo.easeInOut,onComplete:function(){
                            tween.set(tgt, {pointerEvents: 'auto', zIndex: 1});
                            done();
                            eventManager.sendMessage(eventManager.TRANSITION_IN_DONE);
                        }});
                    },
                    leave: function (element, done) {
                        var tgt = $(element);
                        tween.set(tgt, {pointerEvents: 'none', zIndex: 1});
                        tween.to($(tgt), 1, {xPercent: -100, ease: Expo.easeInOut, onComplete: function () {
                            done();
                            eventManager.sendMessage(eventManager.TRANSITION_OUT_DONE);
                        }});
                    }
                }
            };

            return ["eventManager", TransitionManager ];
        });

}(define));
