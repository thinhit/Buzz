"use strict";

(function () {

    var io = require('socket.io').listen(8889),
        DBModel = require('./../database/mongodb/mongodb-schema'),
        DBCrud = require('./../database/mongodb/mongodb-crud');

    io.on('connection', function (socket) {

        socket.on('new:message', function (msg) {

            socket.broadcast.emit('send:message', msg);
            DBCrud.readOne(DBModel.Conversions, msg.conversionId, function (err, resp){
                if(err){
                    socket.emit('message:send:error');
                }else {
                    socket.broadcast.emit('send:message', resp);

                }

            })

        });

        socket.on('create:room', function (room){
            socket.broadcast.emit('new:room', room);
        })


    });


})();