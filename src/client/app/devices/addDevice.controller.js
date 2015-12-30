(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('AddDeviceController', addDeviceController);

    addDeviceController.$inject = ['$mdDialog', '$list', 'group'];
    /* @ngInject */
    function addDeviceController($mdDialog, $list, group) {
        var vm = this;
        vm.device = {};
        vm.cancel = $mdDialog.cancel;

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
            }
            vm.device.icon = icon;
            $list.devices.save({
                    id: group._id
                },
                vm.device,
                success);
        };

        vm.deviceTypes = ['PLC', 'HMI', 'PC','Printer', 'PC', 'Switch', 'Device'];

        function success(group) {
            $mdDialog.hide(group);
        }
    }
})();