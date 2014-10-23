'use strict';

angular.module('Buzz')
    .controller('HomeCtrl', ['$scope', '$state', '$http', '$auth', '$restful',
        function ($scope, $state, $http, $auth, $restful) {
            $scope.conversionLoaded = false;
            $scope.selectedGroup = {};
            $scope.conversionChanel = [];
            $scope.sendMessage = null;

            $scope.newChanel = {
                name: ''
            };


            $scope.createNewChanel = function (chanel) {

                var saveChanel =
                {
                    name: chanel.name,
                    creator: $auth.getUser().id,
                    project: $auth.getCurrentProject().id
                };
                console.log(saveChanel);
                $restful.save({table: 'Rooms'}, saveChanel, function (resp) {
                    if (resp.success) {
                        $scope.conversionChanel.push(resp.data);

                        $state.go('buzz.home.conversion', {conversionId: resp.data.id});
                        $('#modal-create-group').modal('hide');
                        $scope.newChanel = {};
                    }
                });


            };

            $scope.getListRooms = function () {
                var filter = [
                    {
                        property: 'project',
                        type: 'text',
                        comparison:'eq',
                        value: $auth.getCurrentProject().id
                    }
                ];
                $restful.get({table: "Rooms", filter: JSON.stringify(filter) }, function (resp){
                    if(resp.success){
                        $scope.conversionChanel = resp.data;
                    }
                });
            };


            $scope.getListRooms();
            /*var getJSON = function (file, callback) {
             $http.get('scripts/data/' + file + '.json').success(function (resp) {
             callback(null, resp);
             }).error(function (err) {
             callback(err, null);
             })
             };*/


            /*getJSON('chanels', function (err, resp){
             if(err) throw err;
             $scope.conversionChanel = resp;
             $state.go('buzz.home.conversion', {conversionId: $scope.conversionChanel[0].id});
             });*/


            $scope.hehe = function (item) {
                console.log('enterSubmit', item);
            }

        }
    ])
;
