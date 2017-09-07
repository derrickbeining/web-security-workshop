'use strict';

var Sequelize = require('sequelize');

var databaseURI = process.env.DATABASE_URI || 'postgres://localhost:5432/auther';

var db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

module.exports = db;
