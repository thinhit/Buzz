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
                console.log($query);
                var defer = $q.defer();
                defer.resolve($scope.listUserTags);
                return defer.promise;
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