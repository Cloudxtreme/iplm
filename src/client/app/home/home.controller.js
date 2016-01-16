/* global mRefresh */
(function () {
    'use strict';
    angular
        .module('ipListApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$list', '$mdSidenav', '$mdBottomSheet', '$mdDialog',
                              '$scope', '$stateParams', '$rootScope', '$state', '$filter'];
    /* @ngInject */
    function HomeController($list, $mdSidenav, $mdBottomSheet, $mdDialog,
                            $scope, $stateParams, $rootScope, $state, $filter) {

        $scope.devices = [];
        $scope.showGroupDetails = showGroupDetails;
        $scope.selected = [];
        $scope.Group = [];
        $scope.$emit('Loading', true);

        $scope.$on('ShowGroupDetails', function (event) {
            showGroupDetails(event);
        });

        $scope.showDetails = function (id, deviceId) {
            $scope.$emit('showDeviceToolbar');
            $state.go('device', {
                id: id,
                deviceId: deviceId
            });
        };

        $scope.$on('AddDevice', function ($event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'AddDeviceController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    group: $scope.Group
                },
                templateUrl: 'app/devices/add-device-dialog.html'
            }).then(getDevices);
        });

        $scope.$on('AddGroup', function ($event) {
            $mdDialog.show({
                clickOutsideToClose: true,
                controller: 'AddGroupController',
                controllerAs: 'ctrl',
                focusOnOpen: false,
                targetEvent: $event,
                locals: {
                    group: {}
                },
                templateUrl: 'app/groups/add-group-dialog.html'
            });
        });
        
        getDevices();

        $scope.$watch('devices', function(value){
            mRefresh({
                nav: '#navMain',
                scrollEl: '#contentMain',
                onBegin: refreshFunction
            });
        });

        // *********************************
        // Internal methods
        // *********************************
        function refreshFunction() {
            console.info('refresh requested.');
            return $list.groups.get({
                    id: $stateParams.id
                }, success).$promise;
        }
        
        function getDevices() {
            var _id = $stateParams.id;
            if (typeof (_id) === 'undefined') {
                $list.groups.query(success).$promise;
            } else {
                $list.groups.get({
                    id: _id
                }, success).$promise;
            }
        }
        
        function success(group) {
            if (angular.isArray(group)) {
                var groups = $filter('orderBy')(group, 'name');
                if (groups.length > 0) {
                    $state.go('group', {
                        id: groups[0]._id
                    });
                }
            } else {
                $scope.$emit('GroupChanged', {
                    name: group.name,
                    id: $stateParams.id
                });
                $scope.Group = group;
                $scope.devices = group.devices;
            }
            mRefresh.resolve();
            $scope.$emit('Loading', false);
        }

        /**
         * Show the bottom sheet
         */
        function showGroupDetails($event) {
            var group = $scope.Group;

            return $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: 'app/groups/group-details-sheet.html',
                controller: ['$mdBottomSheet', '$mdDialog', '$list', '$scope', DetailsPanelController],
                controllerAs: 'cp',
                bindToController: true,
                targetEvent: $event
            });

            /**
             * Bottom Sheet controller for the Group Actions
             */
            function DetailsPanelController($mdBottomSheet, $mdDialog, $list, $scope) {
                var vm = this;
                vm.group = group;

                vm.cancel = function () {
                    $mdBottomSheet.hide();
                };
                vm.save = function () {
                    $mdBottomSheet.hide();
                };
                vm.delete = function ($event) {
                    var confirm = $mdDialog.confirm()
                        .title('Would you like to delete this folder?')
                        .textContent('This action is not reversable. All contents of this folder will be removed.')
                        .ariaLabel('Delete device.')
                        .targetEvent($event)
                        .ok('Delete')
                        .cancel('Cancel');
                    $mdDialog.show(confirm).then(function () {
                        $mdBottomSheet.hide();
                        $list.groups.remove({
                            id: vm.group._id
                        }, onDeleted).$promise;
                    });
                };

                function onDeleted() {
                     $rootScope.$broadcast('RefreshSidebar');
                }
            }
        }
    }

})();