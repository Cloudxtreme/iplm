(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$list', '$stateParams', '$scope', '$state'];
    /* @ngInject */
    function SearchController($list, $stateParams, $scope, $state) {
        var vm = this;

        vm.errorText = {};
        vm.searchResults = [];
        vm.showDetails = function (id, deviceId) {
            $scope.$emit('showDeviceToolbar');
            $state.go('device', {
                id: id,
                deviceId: deviceId
            });
        };

        // *********************************
        // Internal methods
        // *********************************
        function init() {
            $scope.$emit('showSearchToolbar');
            $list.search.query({
                searchQuery: $stateParams.searchQuery
            }, success, error);
        }

        function error(err) {
            vm.errorText = err;
        }

        function success(data) {
            vm.searchResults = data;
        }
    }
}());