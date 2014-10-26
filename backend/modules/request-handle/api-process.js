"use strict";
(function () {

    /*
     *
     * @class apiProcess
     * @constructor
     * @requires mongodbCrud
     * @requires mongodbSchema
     * @requires reqProcess
     * */

    var apiProcess = {
        mongodbCrud: require('./../database/mongodb/mongodb-crud'),
        mongodbSchema: (new (require('./../database/mongodb/mongodb'))).Schema(),
        reqProcess: null,
        elastic: require('./../elasticsearch/handlers'),
        notifications: require('./../notifications/handlers')
    };


    /*
     * Process when user Read
     * @methods read
     *
     * */

    apiProcess.read = function (req, res) {
        // Process with request from client

        var actionName = 'read',
            actionDesc = 'Read document',
            action = apiProcess.getAction(actionName, actionDesc, req, res);

        // Process action

        apiProcess.process(action, function () {
            return [
                apiProcess.reqProcess.getFilter(),
                apiProcess.reqProcess.getSorter(),
                apiProcess.reqProcess.getField(),
                apiProcess.reqProcess.getLimit(),
                apiProcess.reqProcess.getOffset()
            ];
        });
    };


    apiProcess.readOne = function (req, res) {

        var actionName = 'readOne',
            actionDesc = 'Read one document',
            action = apiProcess.getAction(actionName, actionDesc, req, res),
            id = apiProcess.reqProcess.getId();


        apiProcess.process(action, function () {
            return [
                id
            ];
        });
    };


    apiProcess.create = function (req, res) {


        var actionName = 'create',
            actionDesc = 'Create document',
            action = apiProcess.getAction(actionName, actionDesc, req, res),
            body = apiProcess.reqProcess.getBody();


        apiProcess.process(action, function () {
            return [
                body
            ];
        });
    };


    apiProcess.update = function (req, res) {


        var actionName = 'update',
            actionDesc = 'Update document',
            action = apiProcess.getAction(actionName, actionDesc, req, res),
            body = apiProcess.reqProcess.getBody(),
            id = apiProcess.reqProcess.getId();


        apiProcess.process(action, function () {
            return [
                id,
                body
            ];
        });
    };


    /*
     * @method apiProcess.delete
     *
     * */

    apiProcess.delete = function (req, res) {


        var actionName = 'delete',
            actionDesc = 'Delete document',
            action = apiProcess.getAction(actionName, actionDesc, req, res),
            id = apiProcess.reqProcess.getId();


        apiProcess.process(action, function () {
            return [
                id
            ];
        });
    };


    apiProcess.process = function (action, fn) {
        console.log('Action: ' + action.actionName + ' begin process');
        var me = this,
            mongodbCrudAction = me.mongodbCrud[action.actionName];

        // Require database defined !

        if (!me.mongodbSchema.hasOwnProperty(action.tableName)) {
            me.endProcess(false, 'Table ' + action.tableName + ' is not defined', action);
        } else {


            // callback function run on mongodbCrudAction response data

            var cb = function (err, data) {

                me.endProcess(!err, err, action, data);
            };


            // Push params and callback to mongodbCrudAction and run it.
            var args = fn();
            args.unshift(me.mongodbSchema[action.tableName]);
            args.push(cb);

            mongodbCrudAction.apply(this, args);
        }
    };


    apiProcess.endProcess = function (success, error, action, data) {
        var me = this;
        var ret = {
            success: success,
            data: data,
            statusCode: 200,
            message: error
        };

        me.mongodbSchema[action.tableName].count(function (err, count) {
            ret.total = count;

            action.res.json(ret);
        });


    };


    apiProcess.getAction = function (actionName, actionDesc, req, res) {
        var me = this;

        apiProcess.reqProcess = new (require('./../request-handle/params-process'))(req, res);

        return {
            tableName: me.reqProcess.getTableName(),
            actionName: actionName,
            actionDesc: actionDesc,
            req: req,
            res: res
        };
    };


    module.exports = apiProcess;
})();


