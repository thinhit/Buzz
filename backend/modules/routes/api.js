"use strict";
(function () {

    var express = require('express'),
        router = express.Router(),

        apiProcess = require('./../request-handle/api-process'),
        _util = require('../utils/utils'),
        token = require('../auth/token');


    router.use(function (req, res, next) {
        var _authToken = req.headers.authorization || req.query.token,
            _decode,
            errMessage = '';
        if (_authToken) {
            if (token.isExits(_authToken)) {
                _decode = token.decode(_authToken);
                req.userAuth = _decode;

            } else {
                errMessage = 'Token not found';
            }
        } else {
            errMessage = 'Unauthorization'
        }
        if (errMessage != '') {
            res.send(403, {
                message: errMessage
            });

        } else {

            next();
        }
    });

    router.get('/:tableName', apiProcess.read);

    router.get('/:tableName/:id', apiProcess.readOne);

    router.post('/:tableName', apiProcess.create);
    router.put('/:tableName/:id', apiProcess.update);

    router.delete('/:tableName/:id', apiProcess.delete);

    module.exports = router;

})();