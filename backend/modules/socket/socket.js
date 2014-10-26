"use strict";

(function () {

    var io = require('socket.io').listen(8889),
        DBModel = require('./../database/mongodb/mongodb-schema'),
        DBCrud = require('./../database/mongodb/mongodb-crud');

    io.on('connection', function (socket) {

        socket.on('new:message', function (msg) {
            console.log('new:message', msg);
            DBCrud.readOne(DBModel.Conversions, msg.conversionId, function (err, resp){
                if(err){
                    socket.emit('message:send:error');
                }else {
                    socket.broadcast.emit('send:message', resp);
                    console.log('send:message', resp);
                }

            })

        });


    });


})();