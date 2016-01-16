(function () {
    'use strict';
    angular
        .module('ipListApp', [
            'ngMaterial',
            'ngResource',
            'ngAnimate',
            'ngCookies',
            'ngSanitize',
            'ui.router'])
        .config(['$compileProvider', '$mdThemingProvider', '$mdIconProvider',
        function ($compileProvider, $mdThemingProvider, $mdIconProvider) {

                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
                $compileProvider.debugInfoEnabled(false);

                var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
                    'contrastDefaultColor': 'light',
                    'contrastDarkColors': ['50'],
                    '50': 'ffffff'
                });
                $mdThemingProvider.definePalette('customBlue', customBlueMap);
                $mdThemingProvider.theme('default')
                    .primaryPalette('customBlue', {
                        'default': '500',
                        'hue-1': '50'
                    })
                    .accentPalette('pink');
                $mdThemingProvider.theme('input', 'default')
                    .primaryPalette('grey');
                $mdIconProvider
                    .icon('PC', 'images/laptop117.svg') // Register a specific icon (by name)
                    .icon('Printer', 'images/printer88.svg')
                    .icon('HMI', 'images/device124.svg')
                    .icon('PLC', 'images/settings48.svg')
                    .icon('Switch', 'images/settings48.svg')
                    .icon('Device', 'images/settings48.svg');
        }])
        .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('home', {
                        url: '/',
                        templateUrl: 'app/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'ctrl'
                    })
                    .state('search', {
                        url: '/search/:searchQuery',
                        templateUrl: 'app/search/search-results.html',
                        controller: 'SearchController',
                        controllerAs: 'ctrl'
                    })
                    .state('group', {
                        url: '/group/:id',
                        templateUrl: 'app/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'ctrl'
                    })
                    .state('device', {
                        url: '/group/:id/device/:deviceId',
                        templateUrl: 'app/devices/device-details.html',
                        controller: 'DeviceController',
                        controllerAs: 'ctrl'
                    })
                    .state('settings', {
                        url: '/settings',
                        templateUrl: 'app/settings/settings.html',
                        controller: 'SettingsController',
                        controllerAs: 'ctrl'
                    });
                // if none of the above states are matched, use this as the fallback
                $urlRouterProvider.otherwise('/');
        }]);
})();