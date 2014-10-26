angular.module('Buzz')
    .service('$restful', ['$resource', '$auth', function $restful($resource, $auth) {

        return $resource(appAPI + '/:api/:table/:id', {
            api: 'api',
            id: '@id',
            table: '@table'
        }, {
            'get': {method: 'GET'},
            'save': {method: 'POST', params: {}},
            'put': {method: 'PUT', params: {}},
            'query': {method: 'GET', isArray: true},
            'delete': {method: 'DELETE', params: {}}
        });

    }]);