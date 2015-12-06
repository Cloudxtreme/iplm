(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('AddGroupController', addGroupController);

    addGroupController.$inject = ['$mdDialog', '$list', '$scope'];
    /* @ngInject */
    function addGroupController($mdDialog, $list, $scope) {
        var vm = this;

        vm.group = {};
        vm.cancel = $mdDialog.cancel;

        vm.create = function () {
            $list.groups.save(vm.group, success);
        };

        function success(group) {
            $mdDialog.hide(group);
            //$scope.$emit('refreshSidebar');
        }
    }
})();