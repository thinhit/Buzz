'use strict';

angular.module('Buzz')
    .controller('ProjectCtrl', ['$scope', '$state', '$http', '$auth', '$restful', '$q', 'listUser',
        function ($scope, $state, $http, $auth, $restful, $q, listUser) {

            $scope.projectDatas = [];
            $scope.listUserTags = [];

            if (!$auth.getUser()) {
                $state.go('login');
            }

            $scope.people = [
                { name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
                { name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
                { name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
                { name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
                { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
                { name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
                { name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
                { name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
                { name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
                { name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
            ];

            listUser.$promise.then(function (resp){
                $scope.listUserTags = resp.data;
            });

            $scope.selectProject = function (project) {
                $auth.setCurrentProject(project);
                $state.go('buzz.home');
            };


            $scope.createNewProject = function (projectInfo) {
                console.log(projectInfo);
            };


            $scope.getTagUser = function ($query) {

                $restful.get({
                    table: 'Users',
                    limit: 1000,
                    start: 0
                }, function (resp) {
                    if (resp.success) {
                        $scope.listUserTags = resp.data;
                    }
                })
            };


            $restful.get({
                table: 'Projects'
            }, function (resp) {
                if (resp.success) {
                    $scope.projectDatas = resp.data;
                }
            })


        }]);