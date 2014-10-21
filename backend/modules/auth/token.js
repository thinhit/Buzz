"use strict";
(function () {
    var _ = require('underscore'),
        jwt = require('jwt-simple'),
        serverInit = require('../init'),
        token = {
            store: []
        };

    token.push = function (token) {
        this.store.push(token);
    };

    token.isExits = function (token) {
        var me = this,
            found = false;
        _.each(me.store, function (v, k) {
            if (v == token) {
                found = true
            }
        });

        return found;
    };

    token.encode = function (userInfo, cb) {

        var _token = jwt.encode(userInfo, serverInit.tokenSecret);
        this.push(_token);
        return _token;
    };

    token.decode = function (token) {
        var _decoded = jwt.decode(token, serverInit.tokenSecret);
        return _decoded;
    };

    token.remove = function (token) {
        var me = this;
        me.store.splice(me.store.indexOf(token), 1);
    };

    token.restrict = function () {

    };

    module.exports = token;

})();