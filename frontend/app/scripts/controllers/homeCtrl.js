'use strict';

angular.module('Buzz')
    .controller('HomeCtrl', ['$scope', '$state', '$http',
        function ($scope, $state, $http) {
            $scope.conversionLoaded = false;
            $scope.selectedGroup = {};
            $scope.conversionChanel = [];

            $scope.newChanel = {
                name: ''
            };


            $scope.createNewChanel = function (chanel) {
                var saveChanel =
                {
                    id: $scope.conversionChanel.length + 1,
                    create_at: new Date(),
                    update_at: new Date(),
                    creator: {
                        id: 1,
                        fullname: "Thinh Nguyen",
                        username: "thinhit",
                        avatar: "images/avt.jpg"
                    },
                    last_conversion: {
                        user: {
                            fullname: "Thinh Nguyen",
                            username: "thinhit",
                            avatar: "images/avt.jpg"
                        },
                        message: "Chao` ca nha :) ",
                        create_at: new Date()
                    }
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






            /*if ($state.params.conversionId && $state.params.conversionId !== "") {
             angular.forEach($scope.conversionGroup, function (v) {
             if (v.id == $state.params.conversionId) {
             $scope.selectedGroup = {
             name: v.name
             }
             }
             })
             }*/
            $scope.hehe = function (item) {
                console.log('enterSubmit', item);
            }

        }
    ])
;
