(function (){
    var User = require('../database/mongodb').Users,
        jwt = require('jwt-simple');
    function _getUserInfo(userId, callback){
        User.findById(userId, function (err, resp){
            callback(err, resp);
        })
    }

    function updateUserInfo(userId, update,callback){

    }

})();