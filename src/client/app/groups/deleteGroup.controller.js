(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('DeleteGroupController', DeleteGroupController);

    DeleteGroupController.$inject = ['id', '$mdDialog', '$list', '$scope', '$state'];
    /* @ngInject */
    function DeleteGroupController(id, $mdDialog, $list, $scope, $state) {
        var vm = this;

        vm.no = $mdDialog.cancel;

        vm.yes = function () {
            $list.groups.delete({
                id: id
            }, success, error);
        };

        function error(err) {
            $scope.error = err;
        }

        function success() {
            $mdDialog.hide();
            $scope.$emit('refreshSidebar');
            $state.go('home');
        }
    }
}());