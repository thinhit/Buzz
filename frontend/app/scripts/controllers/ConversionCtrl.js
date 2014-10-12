'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('Buzz')
    .controller('ConversionCtrl', function ($scope) {
        $scope.conversionLoaded = false;
        setTimeout(function () {
            console.log('helo');
            $scope.conversionLoaded = true;
            $scope.$apply();
        }, 1000);
    });
