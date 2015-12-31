(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('AddGroupController', addGroupController);

    addGroupController.$inject = ['$mdDialog', '$list', '$rootScope'];
    /* @ngInject */
    function addGroupController($mdDialog, $list, $rootScope) {
        var vm = this;

        vm.group = {};
        vm.cancel = $mdDialog.cancel;

        vm.create = function () {
            $list.groups.save(vm.group, success);
        };

        function success(group) {
            $mdDialog.hide(group);
            $rootScope.$broadcast('RefreshSidebar');
        }
    }
})();