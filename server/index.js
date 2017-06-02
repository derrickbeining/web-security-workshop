'use strict';
require('../secrets.js');

var https = require('https');
var fs = require('fs');
var app = require('./app');
var db = require('./db');

var port = 8443;
var server = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}, app);

server.listen(port, function (err) {
  if (err) throw err;
  console.log('HTTPS server patiently listening on port', port);
  db.sync()
  .then(function () {
    console.log('Oh and btw the postgres server is totally connected, too');
  });
});

module.exports = server;
