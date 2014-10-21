"use strict";

(function () {

    var io = require('socket.io').listen(8889),
        notify = require('./../notifications/handlers');


    io.on('connection', function (socket) {
        console.log('hello');

        socket.on('socket', function (data) {
            //var emit = 'socket:' + data.table + ':' + data.action;
           socket.emit('new:socket', {data: 'hello'});
        });

        socket.on('user:connect', function (data){
            console.log('useConnected', data);
        });

        notify.on('xinchao', function (data){
            console.log('Notifications Push !', data);
        })
    });


})();