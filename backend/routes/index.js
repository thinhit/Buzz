var express = require('express');
var router = express.Router();
var mongoo = require('../database/mongodb');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
