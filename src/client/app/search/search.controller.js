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
            console.log(id);
            console.log(deviceId);
            
            $state.go('device', {
                id: id,
                deviceId: deviceId
            });
        };
        
        init();

        // *********************************
        // Internal methods
        // *********************************
        function init() {
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