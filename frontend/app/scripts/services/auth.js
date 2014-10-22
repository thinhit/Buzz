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
        login: function (item, callback) {
            var me = this;
            $http.post(appAPI + '/login', {
                username: item.username,
                password: item.password
            })
                .success(function (resp) {
                    me.setUser(resp);
                    callback(null, resp);

                })
                .error(function (error) {
                    callback(error, null);
                })
        },
        setUser: function (user) {
            window.localStorage.setItem('userLogin', JSON.stringify(user));
        }
    };
});