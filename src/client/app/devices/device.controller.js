(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('DeviceController', deviceController);

    deviceController.$inject = ['$list', '$stateParams', '$mdDialog', '$state', '$scope'];
    /* @ngInject */
    function deviceController($list, $stateParams, $mdDialog, $state, $scope) {
        var vm = this;
        vm.device = {};

        vm.update = function () {
            var icon = {
                name: vm.device.device,
                color: ''
            };

            switch (vm.device.device) {
            case 'PLC':
                icon.color = '#777';
                break;
            case 'HMI':
                icon.color = '#A00';
                break;
            case 'PC':
                icon.color = '#0C2EFF';
                break;
            case 'Printer':
                icon.color = '#F06';
                break;
            case 'Switch':
                icon.color = '#90C';
                break;
            case 'Device':
                icon.color = '#A3006F'
            }
            vm.device.icon = icon;
            $list.devices.update({
                    id: vm.device.groupId,
                    deviceId: vm.device._id
                },
                vm.device,
                function () {
                    $state.go('group', {
                        id: vm.device.groupId
                    });
                },
                error
            ).$promise;
        };

        $scope.$on('DeleteDevice', function($event){
            deleteDevice($event);
        });
        
        function deleteDevice ($event) {
            var confirm = $mdDialog.confirm()
                .title('Would you like to delete this device?')
                .textContent('This action is not reversable.')
                .ariaLabel('Delete device.')
                .targetEvent($event)
                .ok('Delete')
                .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $list.devices.remove({
                    id: vm.device.groupId,
                    deviceId: vm.device._id
                }, onDeleted, error).$promise;
            });
        };

        vm.deviceTypes = ['PLC', 'HMI', 'PC', 'Printer', 'PC', 'Switch', 'Device'];

        vm.cancel = function () {
            $state.go('group', {
                id: vm.device.groupId
            });
        };

        init();

        function onDeleted() {
            $state.go('group', {
                id: vm.device.groupId
            });
        }

        function error(err) {
            console.error(err);
        }

        function success(data) {
            vm.device = data;
        }

        function init() {
            return $list.devices.get({
                id: $stateParams.id,
                deviceId: $stateParams.deviceId
            }, success, error).$promise;
        }
    }
})();