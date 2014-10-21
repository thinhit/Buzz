"use strict";
(function () {



    /* https://github.com/visionmedia/node-pwd
     * Module dependencies.
     */
    var crypto, iterations, len;

    crypto = require('crypto');

    len = 128;

    iterations = 12000;


    /*
     * Hashes a password with optional `salt`, otherwise
     * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
     *
     * @param {String} password to hash
     * @param {String} optional salt
     * @param {Function} callback
     * @api public
     */

    exports.hash = function (pwd, salt, fn) {
        var e;
        if (3 === arguments.length) {
            try {
                crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
                    if (err) {
                        fn(err, null);
                    } else {
                        hash = hash.toString('base64');
                        fn(null, hash);
                    }
                });
            } catch (_error) {
                e = _error;
                fn(e.toString(), null);
            }
        } else {
            fn = salt;
            crypto.randomBytes(len, function (err, salt) {
                if (err) {
                    return fn(err);
                }
                salt = salt.toString('base64');
                try {
                    crypto.pbkdf2(pwd, salt, iterations, len, function (err, hash) {
                        if (err) {
                            return fn(err);
                        }
                        hash = hash.toString('base64');
                        fn(null, salt, hash);
                    });
                } catch (_error) {
                    e = _error;
                    fn(e.toString(), null, null);
                }
            });
        }
    };

})();
