var express = require('express');
var dbAbstractionLayer = require('../public/javascripts/DbAbstractionLayer');

var router = express.Router();


router.get('/', function(_req, res, _next) {
dbAbstractionLayer.queryelectroniqueCollection().then(response=>{
  res.json(response);
}).catch(error=>{
  res.status(500).json({});
});

});

module.exports = router;