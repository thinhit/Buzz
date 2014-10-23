"use strict";

(function () {

    var mongoDBSchema = {},
        mongoose = require('mongoose'),
        ObjectId = mongoose.Schema.Types.ObjectId,
        Schema = mongoose.Schema;


    // Defined Database


    var userSchema = new Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        avatar: {type: String},
        email: {type: String, required: true},
        username: {type: String, required: false},
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

    var roomSchema = new Schema({
        "name": {type: String, required: true},
        "project": {type: ObjectId, required: true, ref: "Projects"},
        "last_conversion": {type: ObjectId, required: true, ref: "Conversions"},
        "thumb": {type: String, required: true},
        "create_at": {type: Date, default: new Date(), required: true},
        "update_at": {type: Date, default: new Date()}
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    mongoDBSchema.Rooms = mongoose.model('Rooms', roomSchema);


    var projectSchema = new Schema({
        "name": {type: String, required: true},
        "creator": {type: ObjectId, required: true, ref: "Users"},
        "thumb": {type: String},
        "member":{type: Array},
        "create_at": {type: Date, default: new Date(), required: true},
        "update_at": {type: Date, default: new Date()}
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    mongoDBSchema.Projects = mongoose.model('Projects', projectSchema);




    var conversionSchema = new Schema({
        user: {type: ObjectId, required: true, ref: "Users"},
        chanel: {type: ObjectId, required: true, ref: "Chanels"},
        message: {type: String, required: true},
        create_at: {type: Date, default: new Date(), required: true},
        update_at: {type: Date, default: new Date()}
    }, {
        toObject: {
            virtuals: true
        },
        toJSON: {
            virtuals: true
        }
    });

    mongoDBSchema.Conversions = mongoose.model('Conversions', conversionSchema);

    mongoDBSchema.Users = Users;


    module.exports = mongoDBSchema;


})();