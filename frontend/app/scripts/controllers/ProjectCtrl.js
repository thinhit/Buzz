'use strict';

angular.module('Buzz')
    .controller('ProjectCtrl', ['$scope', '$state', '$http', '$auth', '$restful', '$q', 'listUser',
        function ($scope, $state, $http, $auth, $restful, $q, listUser) {

            $scope.projectDatas = [];
            $scope.listUserTags = [];
            $scope.currentUser = $auth.getUser();

            if (!$auth.getUser()) {
                $state.go('login');
            }

            $scope.multipleDemo = {};
            $scope.multipleDemo.selectedPeople = [];


            listUser.$promise.then(function (resp){
                $scope.listUserTags = resp.data;
            });

            $scope.selectProject = function (project) {
                $auth.setCurrentProject(project);
                $state.go('buzz.home');
            };


            $scope.createNewProject = function (projectInfo) {
                var listId = [];

                angular.forEach($scope.multipleDemo.selectedPeople, function (value, key){
                    listId.push(value.id);
                });

                listId.push($scope.currentUser.id);

                $restful.save({table: "Projects"}, {
                    name: projectInfo.name,
                    creator: $scope.currentUser.id,
                    member: _.uniq(listId)
                }, function (resp){
                    $('#modal-create-project').modal('hide');
                    if(resp.success){
                        toastr.success('Tạo thành công dự án');
                        $scope.projectDatas.push(resp.data)
                    }else{
                        toastr.error('Có lỗi xảy ra trong quá trình tạo');

                    }
                })

            };


            $scope.getTagUser = function ($query) {

                $restful.get({
                    table: 'Users',
                    limit: 1000,
                    start: 0

                }, function (resp) {
                    if (resp.success) {
                        $scope.listUserTags = resp.data;
                    }
                })
            };


            var filter = [
                {
                    property: 'member',
                    type: 'text',
                    comparison:'eq',
                    value: $auth.getUser().id

                }
            ];

            $restful.get({
                table: 'Projects',
                filter: JSON.stringify(filter),
                start: 0,
                limit: 1000
            }, function (resp) {

                if (resp.success) {
                    $scope.projectDatas = resp.data;
                }
            })


        }]);