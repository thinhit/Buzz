'use strict';

angular.module('Buzz')
    .controller('HomeCtrl', ['$scope', '$state', function ($scope, $state) {
        $scope.conversionLoaded = false;
        $scope.selectedGroup = {};
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


        $scope.conversionChanel = [
            {
                id: 1,
                create_at: new Date(),
                update_at: new Date(),
                name: 'Dự án ping ping',
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
            },
            {
                id: 2,
                create_at: new Date(),
                update_at: new Date(),
                name: 'Dự án Dudo',
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
            },
            {
                id: 3,
                create_at: new Date(),
                update_at: new Date(),
                name: 'Dự án DaoDao',
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
            },
            {
                id: 4,
                create_at: new Date(),
                update_at: new Date(),
                name: 'Chém gio',
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
            }
        ];

        $state.go('buzz.home.conversion', {conversionId: $scope.conversionChanel[0].id});



        /*if ($state.params.conversionId && $state.params.conversionId !== "") {
         angular.forEach($scope.conversionGroup, function (v) {
         if (v.id == $state.params.conversionId) {
         $scope.selectedGroup = {
         name: v.name
         }
         }
         })
         }*/

    }
    ])
;
