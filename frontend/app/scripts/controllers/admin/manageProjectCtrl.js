'use strict';

angular.module('Buzz')
    .controller('manageProjectCtrl', ['$scope', '$rootScope', '$state', '$http', '$auth', '$restful',
        function ($scope, $rootScope, $state, $http, $auth, $restful) {

            $scope.datasource = [];
            $restful.get({table: "Projects"}, function (resp){
                if(resp.success){
                    $scope.datasource = resp.data;
                }
            })
        }]);