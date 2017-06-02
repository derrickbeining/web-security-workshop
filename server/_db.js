'use strict';

var Sequelize = require('sequelize');

var databaseURI = process.env.DB_SECRET;

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

module.exports = db;
