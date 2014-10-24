'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('Buzz')
    .controller('ConversionCtrl', ['$scope', '$rootScope', '$state', '$restful', '$auth', '$socket',
        function ($scope, $rootScope, $state, $restful, $auth, $socket) {

            $scope.conversionLoaded = false;
            $scope.conversionDatas = [];

            if ($state.params.conversionId == '') {
                $state.go('buzz.home');
                return null;
            }

            var roomId = $state.params.conversionId;


            var loadConversion = function () {
                var filter = [
                    {
                        property: 'room',
                        type: 'string',
                        comparison: 'eq',
                        value: roomId
                    }
                ];

                $restful.get({table: 'Conversions', filter: JSON.stringify(filter)}, function (resp) {
                    $scope.conversionLoaded = true;
                    if (resp.success) {
                        $scope.conversionDatas = resp.data;
                    }
                })
            };

            loadConversion();

            $scope.$parent.sendMessage = function (message) {
                var newMessage = {
                    user: $auth.getUser().id,
                    room: roomId,
                    message: message
                };

                $restful.save({table: "Conversions"}, newMessage, function (resp) {
                    if (resp.success) {
                        $scope.$parent.msg = "";
                        $scope.conversionDatas.push(resp.data);

                        $socket.emit('new:message', {
                            conversionId: resp.data.id
                        });

                        $restful.put({table: 'Rooms', id: roomId}, {last_conversion: resp.data.id}, function (res) {
                            angular.forEach($scope.$parent.conversionChanel, function (item) {
                                if (item.id == res.data.id) {
                                    item.last_conversion = res.data.last_conversion;
                                    item.last_conversion = res.data.last_conversion;

                                }
                            })
                        })
                    }
                });
            }


        }]);
