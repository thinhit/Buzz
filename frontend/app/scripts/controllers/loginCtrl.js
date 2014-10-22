'use strict';

angular.module('Buzz')
    .controller('LoginCtrl', ['$scope', '$state', '$http', '$auth',
        function ($scope, $state, $http, $auth) {

            $scope.register = function (item) {
                /*var registerInfo = {
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
                 })*/
            };


            $scope.login = function (item) {
                $auth.login(item, function (err, resp) {
                    if(err){
                        alert('dang nhap khong thanh cong', err);
                    }else {
                        alert('oke');
                    }
                })
            }

        }]);