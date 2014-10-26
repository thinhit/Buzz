"use strict";

(function () {

    var mongoDBConnect,

        mongose = require('mongoose'),
        initConfig = require('../../init');


    mongoDBConnect = function () {
    };

    mongoDBConnect.prototype.connectDB = function () {
        mongose.connect(initConfig.db.mongodb, function (err) {
            if (err)
                throw err;
            else
                console.log('Mongoose connect success !');
        });
    };

    mongoDBConnect.prototype.disconnectDB = function () {
        mongose.connection.close(function () {
            console.log('Mongoose disconnected !');
        })
    };


    mongoDBConnect.prototype.Schema = function () {
        var dbSchema = require('./mongodb-schema');
        return dbSchema;

    };


    module.exports = mongoDBConnect;


})();