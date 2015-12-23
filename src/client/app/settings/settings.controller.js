(function () {
    'use strict';

    angular
        .module('ipListApp')
        .controller('SettingsController', SettingsController);

    SettingsController.$inject = ['$scope'];
    /* @ngInject */
    function SettingsController($scope) {
        var vm = this;

        vm.version = '1.0.0';
        
        $scope.$emit('Loading', false);
    }
}());