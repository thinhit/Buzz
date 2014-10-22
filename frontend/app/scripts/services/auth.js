angular.module('Buzz').factory('$auth', function ($rootScope, $http) {

    return {
        register: function (item) {
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
        },
        login: function (item) {
            $http.post(appAPI + '/login', {
                username: item.username,
                password: item.password
            })
                .success(function (resp) {
                    console.log('login success');
                })
                .error(function (error) {
                    console.log('login error');
                })
        },
        setUser: function (user) {
            window.localStorage.setItem('userLogin', user);
        }
    };
});