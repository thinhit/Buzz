"use strict";
(function () {
    var Users = {},
        async = require('async'),
        _ = require('underscore'),
        mongodb = new (require('./../database/mongodb/mongodb'))(),
        pwd = require('../utils/pwd'),
        token = require('./token'),
        utils = require('../utils/utils');


    Users.findUser = function (opts, callback) {
        mongodb.Schema().Users.findOne(opts, function (err, data) {
            callback(err, data);
        })
    };

    Users.saveUser = function (userInfo, callback) {
        mongodb.Schema().Users.create(userInfo, function (err, data) {
            callback(err, data);
        })
    };


    Users.login = function (username, password, callback) {

        async.waterfall(
            [
                function (cb) {
                    Users.findUser({username: username}, function (err, docs) {
                        if (!docs) {
                            cb('USER.NOT.EXITS', docs);
                        } else {
                            cb(err, docs);
                        }
                    })
                },
                function (user, cb) {
                    pwd.hash(password, user.salt, function (err, hash) {
                        if (user.hash == hash) {
                            cb(null, user);
                        } else {
                            cb('PASSWORD', null);
                        }
                    })

                }
            ],
            function (err, data) {
                callback(null, data, { message: err });
            }
        );

    };

    Users.loginSuccess = function (req, res) {
        var expired = new Date();
        expired.setHours(expired.getHours() + 5);

        var _user = {
            id: req.user._id,
            fullname: req.user.firstname + ' ' + req.user.lastname,
            firstname: req.user.firstname,
            lastname: req.user.lastname,
            avatar: req.user.avatar,
            username: req.user.username,
            role: req.user.role,
            tokenExpired: expired,
            ip: utils.getClientIp(req)
        };

        _user.token = token.encode(_user);

        res.send(_user);

    };

    Users.register = function (req, res) {

        var username = req.body.username,
            password = req.body.password,
            firstname = req.body.firstname,
            lastname = req.body.lastname,
            email = req.body.email;


        async.waterfall(
            [
                function (callback) { // Generate password
                    pwd.hash(password, function (err, salt, hash) {
                        callback(err, salt, hash)
                    })
                },
                function (salt, hash, callback) {
                    Users.findUser({username: username}, function (err, docs) {
                        callback(err, salt, hash, docs);
                    })
                },
                function (salt, hash, user, callback) { // Check exits user and save user
                    if (!user) {

                        var userInfo = {
                            username: username,
                            firstname: firstname,
                            lastname: lastname,
                            email: email,
                            salt: salt,
                            hash: hash
                        };

                        Users.saveUser(userInfo, function (err, docs) {
                            callback(err, docs);
                        })
                    } else {
                        callback('USER.EXITS', null);
                    }
                }
            ],

            function (err, result) {
                var ret = {
                    success: !err,
                    data: result || {},
                    message: err || ''
                };
                res.json(ret)
            }
        )
    };


    Users.logout = function (req, res) {
        var _token = req.headers.Authorization || req.query.token;
        if (_token) {
            token.remove(_token);
        }
        res.send({
            success: true
        })
    };


    Users.restrictToken = function () {

    };


    module.exports = Users;

})();