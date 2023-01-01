var express = require('express');
var dbAbstractionLayer = require('../public/javascripts/DbAbstractionLayer');
var router = express.Router();

router.get('/', function(req, res, next) {
  dbAbstractionLayer.querytlfCollection().then(response=>{
    res.json(response);
  }).catch(error=>{
    res.status(500).json({});
  });

});

module.exports = router;
