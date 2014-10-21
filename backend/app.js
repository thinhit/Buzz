(function () {
    var express = require('express'),
        path = require('path'),
        favicon = require('static-favicon'),
        logger = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),




        elastic = require('./modules/elasticsearch/handlers'),
        apiRoute = require('./modules/routes/api'),
        mongodb = new (require('./modules/database/mongodb/mongodb'))(),
        socket = require('./modules/socket/socket'),
        passport = require('./modules/auth/passport'),
        users = require('./modules/auth/users');


    mongodb.connectDB();
    elastic.connect();



    var app = express();


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    app.use(favicon());
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(cookieParser());

    app.use(passport.initialize());
    app.use(passport.session());


    app.use(express.static(path.join(__dirname, 'public')));

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

        // intercept OPTIONS method
        if ('OPTIONS' == req.method) {
            res.send(200);
        }
        else {
            next();
        }
    });


    app.use('/api', apiRoute);

    app.post('/login', passport.authenticate('local', {
        session: false
    }), users.loginSuccess);


    app.post('/register', users.register);

    app.post('/logout', users.logout);


    /// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /// error handlers

    // development error handler
    // will print stacktrace

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });


    module.exports = app;
})();
