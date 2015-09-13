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
        require(['config'], function() {

            console.log('Require config : Loaded');

            require(['main'], function(App) {
                App.init();
            });

        });
    }

    // Remember:
    // We are not going to use jquery in this project
    // Please refer to http://youmightnotneedjquery.com/
    // This is equivalent to jquery's $(document).ready(); method
    // IE 9+
    if (document.readyState != 'loading') {

        init();

    } else {

        document.addEventListener('DOMContentLoaded', init);
    }

}(document));
