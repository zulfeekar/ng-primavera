// Lets Create a Self-Executing Anonymous Function
(function(document) {

    "use strict";

    // Lets define the Init method
    //
    function init() {

        console.log('App : Initializing');

        // Touch move prevent default. ( Iscroll);
        // document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

        // Loading Configuration
        require(['config'], function(){

            console.log('Require config : Loaded');

            require(['jquery','main'], function($,App){

                App.init(document,$('html').hasClass('touch'));
            });

        });
    }

    if (document.readyState != 'loading')
    {
        init();
    }
    else
    {
        document.addEventListener('DOMContentLoaded', init);
    }

}(document));
