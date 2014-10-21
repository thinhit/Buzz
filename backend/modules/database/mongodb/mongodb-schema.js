"use strict";

(function () {

    var mongoDBSchema = {},
        mongoose = require('mongoose'),
        ObjectId = mongoose.Schema.Types.ObjectId;


    // Defined Database

    var notificationSchema = mongoose.Schema({
        from: {type: String, required: true},
        to: {type: String, required: true},
        shortContent: {type: String, required: true},
        longContent: {type: String, required: true},
        time: {type: Date, default: Date.now}
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    notificationSchema.statics.getPopulation = function () {
        return [
            /*['category', '*']*/
        ];
    };



    var Notifications = mongoose.model('Notifications', notificationSchema);


    var userSchema = mongoose.Schema({
        username :{type: String, required: false},
        hash: {type: String, required: true},
        salt: {type: String, required: true},
        role: {type: String, required: true, default: 'user'}
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    var Users = mongoose.model('Users', userSchema);


    mongoDBSchema.Users = Users;
    mongoDBSchema.Notifications = Notifications;

    module.exports = mongoDBSchema;


})();