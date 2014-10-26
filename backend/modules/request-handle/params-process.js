"use strict";
(function () {
    var _ = require('underscore');
    var reqProcess = function (req, res) {
        this.req = req;
        this.res = res;
    };

    reqProcess.prototype.getFilter = function () {
        var _retEle = [];

        if (this.req.query.filter) {
            var _filter = JSON.parse(this.req.query.filter);

            if (_.isObject(_filter)) {
                for (var item in _filter) {

                    if (_filter.hasOwnProperty(item)) {
                        var _field = {};

                        switch (_filter[item].comparison) {
                            case 'eq':
                                _field[_filter[item].property] = '' + _filter[item].value + '';
                                break;
                            case 'ne':
                                _field[_filter[item].property] = {$ne: _filter[item].value};
                                break;
                            case 'lt':
                                _field[_filter[item].property] = {$lt: _filter[item].value};
                                break;
                            case 'gt':
                                _field[_filter[item].property] = {$gt: _filter[item].value};
                                break;
                            case 'gte':
                                _field[_filter[item].property] = {$gte: _filter[item].value};
                                break;
                            case 'lte':
                                _field[_filter[item].property] = {$lte: _filter[item].value};
                                break;

                            case 'like':
                                _field[_filter[item].property] = new RegExp(_filter[item].value, 'i');
                                break;
                        }
                        _retEle.push(_field);
                    }
                }
            }
        }
        return _retEle;
    };

    reqProcess.prototype.getId = function () {
        var _id = /*JSON.parse(*/this.req.params.id/*)*/;

        return _id;
        /*if (_.isArray(_id)) {
         return _id;
         } else {
         return [_id];
         }*/
    };


    reqProcess.prototype.getTableName = function () {
        return this.toCapitalise(this.req.params.tableName) || '';
    };

    reqProcess.prototype.getSorter = function () {
        var _ret = {};

        if (this.req.query.sort) {
            var _sort = JSON.parse(this.req.query.sort);
            if (_.isObject(_sort)) {


                for (var i = 0; i < _sort.length; i++) {
                    var _property = _sort[i].property,
                        _direction = _sort[i].direction.toUpperCase();
                    _ret[_property] = (_direction == 'DESC') ? -1 : 1;

                    console.log(_ret);
                }
            }
        }

        return _ret || [];
    };

    reqProcess.prototype.getLimit = function () {
        return parseInt(this.req.query.limit) || 10;
    };
    reqProcess.prototype.getBody = function () {
        return this.req.body || {};
    };

    reqProcess.prototype.getOffset = function () {
        return parseInt(this.req.query.offset) || 0;
    };
    reqProcess.prototype.getField = function () {
        return this.req.query.field || [];
    };
    reqProcess.prototype.toCapitalise = function (s) {
        return   s[0].toUpperCase() + s.slice(1);
    };

    module.exports = reqProcess;
})();