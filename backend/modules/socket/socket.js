"use strict";

(function () {

    var io = require('socket.io').listen(8889),
        DBModel = require('./../database/mongodb'),
        DBCrud = require('./../database/mongodb-crud');

    io.on('connection', function (socket) {

        socket.on('new:message', function (msg) {
            DBCrud.findOne(DBModel.Conversions, msg.conversionId, function (err, resp){
                if(err){
                    socket.emit('message:send:error');
                }else {
                    socket.broadcast.emit('send:message', resp);
                }

            })

        });


    });


})();