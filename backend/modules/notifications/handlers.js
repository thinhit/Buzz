"use strict";
(function () {
    var Notifications,
        async = require('async'),
        EventEmitter = require('events').EventEmitter,
        util = require('util'),
        mongoDbSchema = require('./../database/mongodb/mongodb-schema');


    Notifications = new EventEmitter();


    Notifications.push =  function (to, from, content, callback) {

            callback(null, 'hello');

            this.emit('xinchao', {hello: 123});


        /*async.waterfall([
         function (cb) {
         var item = mongoDbSchema.Notifications({
         to: to,
         from: from,
         shortContent: content.shortContent,
         longContent: content.longContent
         });

         item.save(function (err, doc) {
         cb(err, doc);
         })
         },
         function (doc, cb) {

         }
         ], function () {

         });*/


        };


    module.exports = Notifications;


})();