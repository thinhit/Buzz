'use strict';

angular.module('Buzz')
    .controller('HomeCtrl', ['$scope', function ($scope) {
        $scope.conversionGroup = [
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
                last_conversion:{
                    user: {
                        fullname: "Thinh Nguyen",
                        username: "thinhit",
                        avatar: "images/avt.jpg"
                    },
                    message:"Chao` ca nha :) ",
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
                last_conversion:{
                    user: {
                        fullname: "Thinh Nguyen",
                        username: "thinhit",
                        avatar: "images/avt.jpg"
                    },
                    message:"Chao` ca nha :) ",
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
                last_conversion:{
                    user: {
                        fullname: "Thinh Nguyen",
                        username: "thinhit",
                        avatar: "images/avt.jpg"
                    },
                    message:"Chao` ca nha :) ",
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
                last_conversion:{
                    user: {
                        fullname: "Thinh Nguyen",
                        username: "thinhit",
                        avatar: "images/avt.jpg"
                    },
                    message:"Chao` ca nha :) ",
                    create_at: new Date()
                }
            }
        ]
    }]);
