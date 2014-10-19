var express = require('express');
var router = express.Router();
var mongoo = require('../database/mongodb');








router.get('/getUserInfo', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
