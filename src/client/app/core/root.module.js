(function () {
    'use strict';

    /**
     * rootScope.js
     *
     * This file is for all functions that need to be globally accessible or access shared memory between routes.
     */

    angular.module('ipListApp')
        .run(function ($rootScope, $state) {

            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                $state.previous = fromState;
            });
            
            $rootScope.backFunction = onBackButton;
            
            function onBackButton (e) {
                if($state.previous.url === '/' || $state.previous.url === '^'){
                    e.preventDefault();
                    navigator.app.exitApp();
                }
                else {
                    if (typeof (navigator.app) !== "undefined") {
                        navigator.app.backHistory();
                    } else {
                        window.history.back();
                    }
                }
            }
            
            function onResume () {
                $rootScope.$emit('Resumed');
            };

            document.addEventListener("deviceready", function() {
                document.addEventListener('resume', onResume, false); //The resume event fires when the native platform pulls the application out from the background.
                document.addEventListener('backbutton', onBackButton, false);
                // detect application touches and emit an event on rootscope:
                window.addEventListener('statusTap', function () {
                    $rootScope.$emit('NavClicked');
                });
            });
        });
})();