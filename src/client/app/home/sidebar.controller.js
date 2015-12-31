(function () {
    'use strict';
    angular
        .module('ipListApp')
        .controller('SidebarController', SidebarController);

    SidebarController.$inject = ['$list', '$scope', '$filter'];
    /* @ngInject */
    function SidebarController($list, $scope, $filter) {
        $scope.groups = [];

        function success(groups) {
            $scope.groups = $filter('orderBy')(groups, 'name');
        }

        $scope.onChange = function () {
            $list.groups.query(success).$promise;
        };

        function getGroups() {
            $scope.deferred = $scope.onChange();
        }

        getGroups();

        $scope.$on('RefreshSidebar', function () {
            getGroups();
        });
    }

})();