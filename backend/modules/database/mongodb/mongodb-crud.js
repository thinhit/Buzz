"use strict";

(function () {
    var _ = require('underscore');
    var mongodbCrud = {};

    mongodbCrud.read = function (mongoSchemaName, filter, sorter, feild, limit, offset, callback) {
        var findCondition,
            findOption = {};

        findCondition = (filter) ? filter : [];

        findOption.limit = limit;
        findOption.offset = offset;
        findOption.sort = sorter;

        /*
         * find (conditional, field, [options])
         * */

        var schemaPopulate = [];
        if (mongoSchemaName.getPopulation != null) {
            schemaPopulate = mongoSchemaName.getPopulation();
        }

        var fn = mongoSchemaName.find(findCondition[0], null, findOption);


        if (schemaPopulate.length > 0) {

            for (var _i = 0, _len = schemaPopulate.length; _i < _len; _i++) {
                var populate = schemaPopulate[_i];
                var tableName = populate[0];
                var fieldsName = populate[1];
                if (fieldsName === '*') {
                    fn.populate(tableName);
                } else {
                    fn.populate(tableName, fieldsName);
                }
            }

            fn.exec(function (err, docs) {
                callback(err, docs);
            })
        } else {
            fn.exec(function (err, docs) {
                callback(err, docs);
            })
        }
    };


    mongodbCrud.readOne = function (mongoSchemaName, id, callback) {
        var fn;
        if (_.isArray(id)) {
            fn = mongoSchemaName.findOne({'_id': { $in: id}});
        } else {
            fn = mongoSchemaName.findById(id);
        }


        var schemaPopulate = [];
        if (mongoSchemaName.getPopulation != null) {
            schemaPopulate = mongoSchemaName.getPopulation();
        }


        if (schemaPopulate.length > 0) {

            for (var _i = 0, _len = schemaPopulate.length; _i < _len; _i++) {
                var populate = schemaPopulate[_i];
                var tableName = populate[0];
                var fieldsName = populate[1];
                if (fieldsName === '*') {
                    fn.populate(tableName);
                } else {
                    fn.populate(tableName, fieldsName);
                }
            }

            fn.exec(function (err, docs) {
                callback(err, docs);
            })
        } else {
            fn.exec(function (err, docs) {
                callback(err, docs);
            })
        }
    };

    mongodbCrud.create = function (mongoSchemaName, data, callback) {
        var item = new mongoSchemaName(data);
        item.save(function (err, resp) {
            if (!err ) {
                var fn = mongoSchemaName.findById(resp.id);

                var schemaPopulate = [];
                if (mongoSchemaName.getPopulation != null) {
                    schemaPopulate = mongoSchemaName.getPopulation();
                }


                if (schemaPopulate.length > 0) {

                    for (var _i = 0, _len = schemaPopulate.length; _i < _len; _i++) {
                        var populate = schemaPopulate[_i];
                        var tableName = populate[0];
                        var fieldsName = populate[1];
                        if (fieldsName === '*') {
                            fn.populate(tableName);
                        } else {
                            fn.populate(tableName, fieldsName);
                        }
                    }

                    fn.exec(function (err, docs) {
                        callback(err, docs);
                    })
                } else {
                    fn.exec(function (err, docs) {
                        callback(err, docs);
                    })
                }
            }else {
                callback(err, resp);
            }
        });

    };

    mongodbCrud.update = function (mongoSchemaName, id, data, callback) {
        var schemaPopulate = [];
        if (mongoSchemaName.getPopulation != null) {
            schemaPopulate = mongoSchemaName.getPopulation();
        }
        if (_.isArray(id)) {
            mongoSchemaName.update({'_id': { $in: id }}, {$set: data}, {mutil: true}, function (err, docs) {
                callback(err, docs);
            })
        } else {


            var fn = mongoSchemaName.findByIdAndUpdate(id, data);


            if (schemaPopulate.length > 0) {

                for (var _i = 0, _len = schemaPopulate.length; _i < _len; _i++) {
                    var populate = schemaPopulate[_i];
                    var tableName = populate[0];
                    var fieldsName = populate[1];
                    if (fieldsName === '*') {
                        fn.populate(tableName);
                    } else {
                        fn.populate(tableName, fieldsName);
                    }
                }

                fn.exec(function (err, docs) {
                    callback(err, docs);
                })
            } else {
                fn.exec(function (err, docs) {
                    callback(err, docs);
                })
            }
            /*mongoSchemaName.findByIdAndUpdate(id, data, function (err, docs) {
             callback(err, docs);
             })*/
        }


    };


    mongodbCrud.delete = function (mongoSchemaName, id, callback) {
        /*var _id = id.split(',');*/

        mongoSchemaName.findByIdAndRemove(id, function (err, docs) {
            callback(err, docs);
        })
    };

    module.exports = mongodbCrud;

})();