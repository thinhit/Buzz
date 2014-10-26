"use strict";
(function () {


    var initConfig = {
        port: 8888,
        socketPort: 1234,
        db: {
            mongodb: 'mongodb://localhost:27017/buzzapplication',
            redis: ''
        },
        tokenSecret: 'buzz-!@#!@#',
        sessionSecret: 'buzz-!@#!@#'
    };

    module.exports = initConfig;


})();