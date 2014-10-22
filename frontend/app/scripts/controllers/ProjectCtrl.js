'use strict';

angular.module('Buzz')
    .controller('ProjectCtrl', ['$scope', '$state', '$http', '$auth',
        function ($scope, $state, $http, $auth) {

            if (!$auth.getUser()) {
                $state.go('login');
            }


            $scope.selectProject = function (project){
                window.localStorage.setItem('currentProject', project);
                $state.go('buzz.home');
            }


        }]);