"use strict";
(function () {


    var initConfig = {
        port: 8888,
        socketPort: 1234,
        db: {
            mongodb: 'mongodb://vsoft.vn:27017/myApp',
            redis: ''
        },
        tokenSecret: 'vietnam-software-!@#!@#',
        sessionSecret: 'vietnam-software-!@#!@#'
    };

    module.exports = initConfig;


})();