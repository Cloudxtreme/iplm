(function () {
    'use strict';

    /**
     * @ngdoc function
     * @name ipListApp.controller:GlobalCtrl
     * @description
     * # GlobalCtrl
     * Controller of the ipListApp
     */
    angular.module('ipListApp')
        .controller('GlobalCtrl', function ($scope, $rootScope, $mdSidenav, $mdToast, $mdDialog, $state, $window) {

            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
                switch(toState.name) {
                    case 'device': {
                        $scope.showDevice = true;
                        $scope.showMainToolbar = false;
                        $scope.showSearchResults = false;
                        break;
                    }
                    case 'search': {
                        $scope.showSearchResults = true;
                        $scope.showDevice = false;
                        $scope.showMainToolbar = false;
                        break;
                    }
                    case 'home', 'group': {
                        $scope.showMainToolbar = true;
                        $scope.showSearchResults = false;
                        $scope.showDevice = false;
                        break;
                    }
                }
            });

            $scope.goBack = function () {
                backButton();
            };

            $scope.showGroupDetails = function () {
                $scope.$broadcast('ShowGroupDetails');
            };

            $scope.deleteDevice = function ($event) {
                $scope.$broadcast('DeleteDevice', $event);
            };

            $scope.CurrentGroup = {
                name: '',
                id: ''
            };

            $scope.$on('GroupChanged', function (event, data) {
                $scope.CurrentGroup = data;
            });

            $scope.$on('refreshSidebar', function (event, data) {
                $scope.$broadcast('doRefreshSidebar');
            });

            $scope.navigateTo = function (state, id) {
                $state.go(state, {
                    'id': id
                });
                $scope.closeSideNav();
            };

            $scope.searchModel = {
                searchActive: false,
                searchQuery: null
            };

            $scope.clickNav = function () {
                // Publish an event that can be handled by directives
                $rootScope.$emit('NavClicked');
            };

            /**
             * Closes the mdSidenav and handles any related behavior
             */
            $scope.closeSideNav = function () {
                $mdSidenav('left').close()
                    .then(function () {});
            };

            /**
             * A replacement for the sidenav toggle button if it is replaced with a hamburger action.
             */
            $scope.handleHamburger = function () {
                $scope.toggleSideNav();
            };

            $scope.openSidenav = function () {
                $mdToast.hide();
                $mdSidenav('left').open()
                    .then(function () {});
            };

            $scope.keyPress = function(keyCode) {
                if (keyCode === 13) {
                    $scope.executeSearch();
                }    
            };
            
            $scope.executeSearch = function () {
                $state.go('search', {
                    'searchQuery': $scope.searchModel.searchQuery
                });
                $scope.searchModel.searchActive = false;
                $scope.searchModel.searchQuery = null;
            };

            $scope.disableSearch = function () {
                $scope.searchModel.searchActive = false;
                $scope.searchModel.searchQuery = null;
                $scope.showMainToolbar = true;
            };

            /**
             * Closes the mdSidenav and handles any related behavior
             */
            $scope.closeSideNav = function () {
                $mdSidenav('left').close()
                    .then(function () {});
            };

            /**
             * A replacement for the sidenav toggle button if it is replaced with a hamburger action.
             */
            $scope.handleHamburger = function () {
                    $scope.toggleSideNav();
            };

            /**
             * Handles the event of clicking on the nav bar- 
             * this is a common application convention that will make the active
             * scrollable container scroll to the top.
             */
            $scope.$on('NavClicked', function () {
                var domElement = document.getElementById('scrollcontainer');
                domElement.style.overflow = 'hidden';
                // wait for any current momentum scrolling to finish and then jump to top
                //$('#scrollcontainer').animate({scrollTop: 0}, 'fast');
                domElement.style.overflow = '';
            });

            /**
             * Displays the search box element on the toolbar
             */

            $scope.showSearch = function () {
                //var searchBox = angular.element('#searchBox');
                //searchBox.focus();
                $scope.searchModel.searchActive = true;
                $scope.showMainToolbar = false;
            };

            $scope.toggleSearch = function () {
                if ($scope.searchModel.searchActive) {
                    $scope.disableSearch();
                } else {
                    $scope.showSearch();
                }
            };

            /**
             * Displays an alert toast in the bottom right that disappears after 3 seconds
             *
             * Suitable for displaying short unactionable messages to the user
             *
             * @param message The alert message to display to the user
             */
            $scope.showAlertToast = function (message) {
                var toast = $mdToast.simple()
                    .content(message)
                    .highlightAction(false)
                    .position('bottom right')
                    .hideDelay(2000);
                $mdToast.show(toast);
            };

            /**
             * Displays an alert toast in the bottom right that disappears when dismissed by the user
             *
             * Suitable for displaying short unactionable messages to the user
             *
             * @param message The alert message to display to the user
             */
            $scope.showAlertToastPersistent = function (message) {
                var toast = $mdToast.simple()
                    .content(message)
                    .highlightAction(false)
                    .position('bottom right')
                    .hideDelay(0);
                $mdToast.show(toast);
            };

            /**
             * Displays an undoable toast in the bottom right that disappears after 3 seconds
             *
             * @param message the message to display to the user
             * @param callback the function to call when the undo action is clicked
             */
            $scope.showUndoToast = function (message, callback) {
                var toast = $mdToast.simple()
                    .content(message)
                    .action('undo')
                    .highlightAction(false)
                    .position('bottom right')
                    .hideDelay(2000);
                $mdToast.show(toast).then(function () {
                    callback(true);
                });
            };

            /**
             * Displays an undoable toast in the bottom right that disappears when dismissed by the user
             *
             * @param message the message to display to the user
             * @param callback the function to call when the undo action is clicked
             */
            $scope.showUndoToastPersistent = function (message, callback) {
                var toast = $mdToast.simple()
                    .content(message)
                    .action('undo')
                    .highlightAction(false)
                    .position('bottom right')
                    .hideDelay(0);
                $mdToast.show(toast).then(function () {
                    callback(true);
                });
            };

            /**
             * Displays an alert modal dialog
             *
             * Suitable for displaying short messages to the user
             *
             * @param title The title of the dialog box
             * @param message The alert message to display to the user
             * @param ev An event to animate the dialog box from
             */
            $scope.showAlertDialog = function (title, message, ev) {
                console.log(ev);
                $mdDialog.show(
                    $mdDialog.alert()
                    .title(title)
                    .content(message)
                    .ariaLabel('A modal dialog box: ' + message)
                    .ok('close')
                    //.targetEvent(ev)
                );
            };

            var backButton = function () {
                $window.history.back();
            };

        });

}());