(function () {
    var User = require('../database/mongodb').Users,
        jwt = require('jwt-simple'),
        async = require('async'),
        crypto = require('crypto');

    function _getUserInfo(userId, callback) {
        User.findById(userId, function (err, resp) {
            callback(err, resp);
        })
    }

    function _updateUserInfo(userId, data, callback) {
        User.findByIdAndUpdate(userId, data, function (err, resp) {
            callback(err, resp);
        })
    }

    function _registerUser(userInfo, callback) {
        User.create(userInfo, function (err, resp) {
            callback(err, resp);
        })
    }

    function _login(username, password, callback) {
        async.waterfall([
            function (callback) {
                User.findOne({username: username}, function (err, data) {
                    if (err) return callback(err, null);
                    if (data.length > 0) {
                        callback(null, data);
                    } else {
                        callback('ERROR.USER', null);
                    }
                })
            },
            function (user){
                var userPass = crypto.createHash('md5').update(password).digest('hex');
                if(user.password == userPass){
                    callback(null, user);
                }else {
                    callback('ERROR.PASSWORD', null)
                }
            }
        ], function (err, resp) {
            callback(err, resp);
        })
    }

})();