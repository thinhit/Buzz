'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('Buzz')
    .controller('ConversionCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        $scope.conversionLoaded = false;

        setTimeout(function () {
            $scope.conversionLoaded = true;
            $scope.$apply();

        }, 1000);


    }]);
