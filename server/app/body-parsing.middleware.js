'use strict'; 

var bodyParser = require('body-parser');
var router = require('express').Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

module.exports = router;
