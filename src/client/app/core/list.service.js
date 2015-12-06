(function () {
    'use strict';

    angular.module('ipListApp')
        .factory('$list', ['$resource', ListService]);

    function ListService($resource) {
        
        var url = 'http://localhost:8080/';
        return {
            groups: $resource(
                url + 'api/groups/:id', {
                    id: '@_id'
                }, {
                    'update': {
                        method: 'PUT'
                    }
                }
            ),
            devices: $resource(
                url + 'api/groups/:id/devices/:deviceId', {
                    id: '@_id',
                    deviceId: '@deviceId'
                }, {
                    'update': {
                        method: 'PUT'
                    }
                }
            )
        };
    }
})();