(function () {
    "use strict";
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        ObjectId = mongoose.Schema.Types.ObjectId,
        Config = require('../config'),
        dbProvider = {},
        crypto = require('crypto');


    mongoose.connect(Config.dbUrl, function (err) {
        if (err) {
            console.log('Can not connect to MongoDB');
        } else {
            console.log('Connect success to MongoDB');
        }
    });


    var userSchema = new Schema({
        firstname: {type: String, required: true},
        lastname: {type: String, required: true},
        email: {type: String, required: true},
        username: {type: String, required: true},
        avarta: {type: String},
        password: {type: String, required: true, setter: function (value) {
            return crypto.createHash('md5').update(value).digest('hex');
        }},
        role: {type: String, default: 'user'},
        create_at: {type: Date, default: new Date(), required: true}
    });

    var chanelSchema = new Schema({
        "name": {type: String, required: true},
        "creator": {type: ObjectId, required: true, ref: "Users"},
        "thumb": {type: String, required: true},
        "create_at": {type: Date, default: new Date(), required: true},
        "update_at": {type: Date, default: new Date()}
    });

    var conversionSchema = new Schema({
        user: {type: ObjectId, required: true, ref: "Users"},
        chanel: {type: ObjectId, required: true, ref: "Chanels"},
        message: {type: String, required: true},
        create_at: {type: Date, default: new Date(), required: true},
        update_at: {type: Date, default: new Date()}
    });


    dbProvider.Chanels = mongoose.model('Chanels', chanelSchema);
    dbProvider.Users = mongoose.model('Users', userSchema);
    dbProvider.Conversions = mongoose.model('Conversions', conversionSchema);

    module.exports = dbProvider;
})();