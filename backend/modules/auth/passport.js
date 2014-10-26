"use strict";
(function () {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy,
        Users = require('./users');


    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passReqToCallback: true
        }
        , function (req, username, password, done) {
            Users.login(username, password, done);
        }
    ));

    passport.serializeUser(function ( user, done ) {
        done(null, user.id);
    });

    passport.deserializeUser(function ( id, done ) {
        Users.findUser({_id: id}, done);
    });


    module.exports = passport;
})();