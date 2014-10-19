"use strict";

(function () {
    module.exports = function (http) {
        var io = require('socket.io').listen(http);

        io.on('connection', function (socket) {
            console.log('Client connected');
        })
    }
})();