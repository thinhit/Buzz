"use strict";
(function () {
    var util = {};

    util.getClientIp = function (req) {
        return (req.headers['x-forwarded-for'] || '').split(',')[0]
            || req.connection.remoteAddress
            || req.socket.remoteAddress
            || req.connection.socket.remoteAddress;
    };


    module.exports = util;
})();