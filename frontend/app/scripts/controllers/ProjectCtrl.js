'use strict';

angular.module('Buzz')
    .controller('ProjectCtrl', ['$scope', '$state', '$http', '$auth', '$restful', '$q',
        function ($scope, $state, $http, $auth, $restful, $q) {

            $scope.projectDatas = [];
            $scope.listUserTags = [];

            if (!$auth.getUser()) {
                $state.go('login');
            }


            $scope.selectProject = function (project) {
                $auth.setCurrentProject(project);
                $state.go('buzz.home');
            };


            $scope.createNewProject = function (projectInfo) {
                console.log(projectInfo);
            };


            $scope.getTagUser = function ($query){
                return $http.get('http://localhost:8888/api/Users?token='+ $auth.getUser().token);
                /*$restful.get({
                    table: 'Users'
                }, function (resp) {
                    if (resp.success) {
                        $scope.listUserTags = resp.data;
                        *//*$scope.projectDatas = resp.data;*//*
                    }
                })*/
            };
            


            $restful.get({
                table: 'Projects'
            }, function (resp) {
                if (resp.success) {
                    $scope.projectDatas = resp.data;
                }
            })


        }]);