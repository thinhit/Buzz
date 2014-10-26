'use strict';

angular.module('Buzz')
    .controller('LoginCtrl', ['$scope', '$rootScope', '$state', '$http', '$auth',
        function ($scope, $rootScope, $state, $http, $auth) {


            if ($auth.getUser() && _.size($auth.getUser())) {
                $state.go('buzz.project');
            }

            $scope.errMsg = "";
            $scope.register = function (item) {
                $auth.register(item, function (err, resp){
                    if(resp.success){
                        alert("Đăng ký thành công !");
                        $scope.registerInfo = {}
                    }else {
                        alert("Tài khoản đã có người sử dụng");
                    }
                })
            };


            $scope.login = function (item) {
                $auth.login(item, function (err, resp) {
                    if (err) {
                        alert('dang nhap khong thanh cong', err);
                    } else {
                        $rootScope.currentUser = resp;
                        $state.go('buzz.project');

                    }
                })
            }

        }]);