'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');

var rootPath = path.join(__dirname, '..', '..');
var browserPath = path.join(rootPath, 'browser');
var buildPath = path.join(rootPath, 'build');
var nodeModulesPath = path.join(rootPath, 'node_modules');

// router.use(express.static(rootPath));
router.use('/browser', express.static(browserPath));
router.use(express.static(buildPath));
router.use('/node_modules', express.static(nodeModulesPath));

module.exports = router;
