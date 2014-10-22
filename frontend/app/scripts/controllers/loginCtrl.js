'use strict';

angular.module('Buzz')
    .controller('LoginCtrl', ['$scope', '$state', '$http',
        function ($scope, $state, $http) {

            $scope.register = function (item) {
                var registerInfo = {
                    firstname: item.firstname,
                    lastname: item.lastname,
                    username: item.username,
                    password: item.password,
                    email: item.email
                };
                $http.post(appAPI + '/register', registerInfo)
                    .success(function (resp) {
                        console.log('register success');
                    })
                    .error(function (error) {
                        console.log('register error');
                    })
            };


            $scope.login = function (item){
                $http.post(appAPI + '/login', {
                    username: item.username,
                    password: item.password
                })
                    .success(function (resp) {
                        console.log('register success');
                    })
                    .error(function (error) {
                        console.log('register error');
                    })
            }

        }]);