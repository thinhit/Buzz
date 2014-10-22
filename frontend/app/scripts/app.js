'use strict';
var appAPI = 'http://localhost:8888';
angular
    .module('Buzz', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router',
        'angularMoment'
    ])
    .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', function ($routeProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('buzz', {
                abstract: true,
                url: "",
                resolve: {
                    isLogin: ['$auth', '$state', function ($auth, $state){

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
                templateUrl: "views/register.html"
            })
            .state('buzz.project', {
                url: "/project",
                templateUrl: "views/projectList.html",
                controller: "ProjectCtrl"
            })
            .state('buzz.setting.userInfo', {
                url: "/user-info",
                views: {
                    "settingContainer":{
                        templateUrl: 'views/settings/user-info.html'
                    }
                }
            });



        $urlRouterProvider.otherwise("/project");
    }])
    .run(['$rootScope', '$state', '$stateParams', '$socket' , function ($rootScope, $state, $stateParams, $socket) {
        console.log('Application starting !!!');

        $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {

                /*event.preventDefault(); //prevents from resolving requested url
                $state.go('login'); //redirects to 'home.other' state url*/
            });
    }]);
