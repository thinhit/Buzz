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
            $scope.currentProject = $auth.getCurrentProject();
            console.log($scope.currentProject);



            $scope.createNewChanel = function (chanel) {

                var saveChanel =
                {
                    name: chanel.name,
                    creator: $auth.getUser().id,
                    project: $auth.getCurrentProject().id
                };


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
                        if(_.size(resp.data) > 0){
                            $state.go('buzz.home.conversion', {conversionId: $scope.conversionChanel[0].id});
                        }


                    }
                });
            };


            $scope.getListRooms();


        }
    ])
;
