'use strict';

angular.module('Buzz')
    .controller('ProjectCtrl', ['$scope', '$state', '$http', '$auth', '$restful',
        function ($scope, $state, $http, $auth,$restful) {

            $scope.projectDatas = [];
            if (!$auth.getUser()) {
                $state.go('login');
            }


            $scope.selectProject = function (project){
                project = JSON.stringify(project);
                window.localStorage.setItem('currentProject', project);
                $state.go('buzz.home');
            };

            $restful.get({
                table:'Projects'
            }, function (resp){
                if(resp.success){
                    $scope.projectDatas = resp.data;
                }
            })


        }]);