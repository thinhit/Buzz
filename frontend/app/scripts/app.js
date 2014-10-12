'use strict';

angular
    .module('Buzz', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.router'
    ])
    .config(['$routeProvider', '$stateProvider', '$urlRouterProvider', function ($routeProvider, $stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('buzz', {
                abstract: true,
                url: "",
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
                url: "/setting",
                templateUrl: "views/setting.html",
                controller: 'ConversionCtrl'
            });

        $urlRouterProvider.otherwise("/home");
    }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        console.log('Application starting !!!')


    }]);
