'use strict';

var Sequelize = require('sequelize');
var sanitize = require('sanitize-html');

var db = require('../../_db');

var Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  paragraphs: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
    set: function (original) {
      var sanitized = original.map(sanitize);
      this.setDataValue('paragraphs', sanitized);
    }
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('user'),
        as: 'author'
      }]
    })
  }
});

module.exports = Story;
