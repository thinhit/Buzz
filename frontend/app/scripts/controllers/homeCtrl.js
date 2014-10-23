'use strict';

angular.module('Buzz')
    .controller('HomeCtrl', ['$scope', '$state', '$http', '$auth',
        function ($scope, $state, $http, $auth) {
            $scope.conversionLoaded = false;
            $scope.selectedGroup = {};
            $scope.conversionChanel = [];

            $scope.newChanel = {
                name: ''
            };


            $scope.createNewChanel = function (chanel) {




                var saveChanel =
                {
                    name: chanel.name,
                    creator: $auth.getUser().id,
                    project:
                };
                angular.extend(saveChanel, chanel);
                $scope.conversionChanel.push(saveChanel);
                $state.go('buzz.home.conversion', {conversionId: saveChanel.id});
                $('#modal-create-group').modal('hide');
                $scope.newChanel = {};
            };

            var getJSON = function (file, callback) {
                $http.get('scripts/data/' + file + '.json').success(function (resp) {
                    callback(null, resp);
                }).error(function (err) {
                    callback(err, null);
                })
            };


            getJSON('chanels', function (err, resp){
               if(err) throw err;
                $scope.conversionChanel = resp;
                $state.go('buzz.home.conversion', {conversionId: $scope.conversionChanel[0].id});
            });


            $scope.hehe = function (item) {
                console.log('enterSubmit', item);
            }

        }
    ])
;
