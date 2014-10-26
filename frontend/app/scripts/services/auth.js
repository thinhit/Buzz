angular.module('Buzz').factory('$auth', function ($rootScope, $http) {

    return {
        register: function (item, callback) {
            var registerInfo = {
                firstname: item.firstname,
                lastname: item.lastname,
                username: item.username,
                password: item.password,
                email: item.email
            };

            $http.post(appAPI + '/register', registerInfo)
                .success(function (resp) {
                    callback(null, resp);
                })
                .error(function (error) {
                    callback(error, null);
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
                    me.clearUser();
                    callback(error, null);
                })
        },
        logout: function (callback) {
            this.clearUser();
            callback(null, 'oke');
        },
        setUser: function (user) {
            $http.defaults.headers.common['Authorization'] = user.token;
            window.localStorage.setItem('userLogin', JSON.stringify(user));
        },
        getUser: function () {
            var user = window.localStorage.getItem('userLogin');
            return (user) ? JSON.parse(user) : {}

        },
        clearUser: function () {
            window.localStorage.setItem('userLogin', null);
        },
        setCurrentProject: function (project) {
            window.localStorage.setItem('currentProject', JSON.stringify(project));
        },
        getCurrentProject: function () {
            var project = window.localStorage.getItem('currentProject');
            return (project) ? JSON.parse(project) : {}
        },
        setHeaderToken: function () {
            try {
                var token = this.getUser().token;
                if (token) {
                    $http.defaults.headers.common['Authorization'] = token;

                } else {
                    $http.defaults.headers.common['Authorization'] = null;
                }
            } catch (err) {
                $http.defaults.headers.common['Authorization'] = null;
            }


        }


    };
});