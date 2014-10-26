'use strict';

angular.module('Buzz')
    .controller('manageProjectCtrl', ['$scope', '$rootScope', '$state', '$http', '$auth', '$restful',
        function ($scope, $rootScope, $state, $http, $auth, $restful) {

            $scope.datasource = [];
            $scope.selectedItems = {};
            $restful.get({table: "Projects"}, function (resp){
                if(resp.success){
                    $scope.datasource = resp.data;
                }
            });
            
            var closeModal = function(idModal) {
                $(idModal).modal("hide");
            };
            
            $scope.confirmDel = function(prj) {
                swal({
                    title: "Are you sure delete " + prj.name +" project?",
                    text: "You will not be able to recover this project!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel plx!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                     function(isConfirm){
                         if (isConfirm) {
                             $restful.delete({table: "Projects", id: prj.id}, function(resp) {
                             });
                             // console.log($scope.datasource.indexOf(prj));
                             
                             $scope.datasource.splice($scope.datasource.indexOf(prj), 1);
                             
                             swal("Deleted!", "Your project has been deleted.", "success");
                         } else {
	                         swal("Cancelled", "Your imaginary file is safe :)", "error");
                         }
                     });
                
            };
            
            $scope.selectItem = function(item) {
                $scope.selectedItems = item;
            };
            
            $scope.saveItem = function(select) {
                var id = select.id;
                delete select._id;
                delete select.id;
                $restful.put({table: "Projects", id: id}, {name: select.name}, function(resp) {
                });
                // $("#EditItem").modal("hide");
                closeModal("#EditItem");
            };
            
            
            
        }]);
