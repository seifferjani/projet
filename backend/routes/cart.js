var express = require('express')
var router = express.Router() 


var dbAbstractionLayer = require('../public/javascripts/DbAbstractionLayer')


router.post('/', dbAbstractionLayer.store) 
router.get('/', dbAbstractionLayer.findAllCards)
module.exports = router  