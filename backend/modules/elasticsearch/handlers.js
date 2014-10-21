"use strict";

(function () {
    var elastic = {
        elasticClient: null

    };


    elastic.connect = function () {
        this.elasticClient = new (require('elasticsearchclient'))({
            host: 'vsoft.vn',
            port: 9200
        });

    };


    elastic.createIndex = function (database, table, document, id, options, callback) {
        this.elasticClient.index(database, table, document, id, options)
            .on('data', function (data) {

                callback(null, data);
            })
            .on('error', function (error) {

                callback(error, null);
            })
            .exec();
    };


    elastic.search = function (table, options, callback) {

        this.elasticClient.search('tmdt', table, options)
            .on('data', function (data) {
                callback(null, data);
            })
            .on('error', function (error) {
                callback(error, null);
            })
            .exec();
    };
    
    
    // elastic.search({
    //     index: 'tmdt',
    //     type: 'Products',
    //     body: {
    //         query: {
    //             match: {
    //                 title: 'iphone samsung'
    //             }
    //         }
    //     }
    // });


    module.exports = elastic;
})
();
