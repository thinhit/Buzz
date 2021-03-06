'use strict';
var appAPI = 'http://thinh.me:8888';
angular
    .module('Buzz', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'angularMoment',
        'ngTagsInput',
        'ui.select'
    ])
    .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('buzz', {
                abstract: true,
                url: "",
                resolve: {
                    isLogin: ['$auth', '$state', function ($auth, $state) {

                    }]
                },
                templateUrl: "views/buzz.html"
            })
            .state('buzz.home', {
                url: "/home",
                templateUrl: "views/home.html",
                controller: 'HomeCtrl'
            })
            .state('buzz.home.conversion', {
                url: "/conversion/:conversionId",
                views: {
                    "messageBox": {
                        templateUrl: "views/conversion.html",
                        controller: 'ConversionCtrl'
                    }
                }
            })
            .state('buzz.setting', {
                url: "/settings",
                templateUrl: "views/settings.html"
                /*controller: 'ConversionCtrl'*/
            })
            .state('login', {
                url: "/login",
                templateUrl: "views/login.html",
                controller: 'LoginCtrl'
            })

            .state('register', {
                url: "/register",
                templateUrl: "views/register.html",
                controller: 'LoginCtrl'

            })
            .state('buzz.project', {
                url: "/project",
                templateUrl: "views/projectList.html",
                controller: "ProjectCtrl",
                resolve: {
                    listUser: ['$auth', '$state', '$restful', '$q', function ($auth, $state, $restful, $q) {
                        var defer = $q.defer();
                        $restful.get({
                            table: 'Users',
                            limit: 1000,
                            start: 0
                        }, function (resp) {
                            if (resp.success) {

                                defer.resolve(resp);
                            }else {
                                defer.reject();
                            }


                        });

                        return defer.promise;
                    }]
                }
            })
            .state('buzz.setting.userInfo', {
                url: "/user-info",
                views: {
                    "settingContainer": {
                        templateUrl: 'views/settings/user-info.html'
                    }
                }
            })

            .state('buzz.admin', {
                url: "/admin",
                templateUrl: "views/admin.html"
                /*controller: 'ConversionCtrl'*/
            })

            .state('buzz.admin.project', {
                url: "/project",
                views: {
                    "settingContainer": {
                        templateUrl: 'views/admin/project.html',
                        controller: 'manageProjectCtrl'
                    }
                }
            });

        var interceptor = ['$rootScope', '$q', '$location', function ($rootScope, $q, $location) {


            var success = function (response) {
                return response;
            };

            var error = function (response) {
                var status = response.status;
                var config = response.config;
                var method = config.method;
                var url = config.url;

                if (400 <= status && status <= 499) {

                    var errMsg = 'Method: ' + method + ', url: ' + url + ', status: ' + status;
                    console.error(errMsg);
                    if (status === 403 || status === 401) {
                        $rootScope.$broadcast('unauthorize');
                    }
                }

                return $q.reject(response);
            };

            return function (promise) {
                return promise.then(success, error);
            };
        }];

        $httpProvider.responseInterceptors.push(interceptor);


        $urlRouterProvider.otherwise("/project");
    }])
    .run(['$rootScope', '$state', '$stateParams', '$socket', '$auth' , function ($rootScope, $state, $stateParams, $socket, $auth) {

        console.log('Application starting !!!');
        $auth.setHeaderToken();

        $rootScope.currentUser = $auth.getUser();


        $rootScope.logout = function () {
            window.localStorage.clear();
            $state.go('login');
        };

        $rootScope.$on('unauthorize', function () {
            $auth.logout(function (err, resp) {
                $state.go('login');
            });
        });


        $rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {

                /*event.preventDefault(); //prevents from resolving requested url
                 $state.go('login'); //redirects to 'home.other' state url*/
            });
    }]);
