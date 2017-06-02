'use strict';

var Sequelize = require('sequelize');
var crypto = require('crypto');

var db = require('../../_db');

var User = db.define('user', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  },
  phone: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    set: function (plaintext) {
      var hashedPassword = this.hashPassword(plaintext);
      this.setDataValue('password', hashedPassword);
    }
  },
  salt: {
    type: Sequelize.STRING,
    defaultValue: function () {
      return crypto.randomBytes(16).toString('base64');
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  googleId: Sequelize.STRING,
  githubId: Sequelize.STRING,
  twitterId: Sequelize.STRING
}, {
  scopes: {
    defaultScope: {
      attributes: {exclude: ['password', 'salt', 'googleId', 'githubId', 'twitterId']}
    },
    populated: () => ({
      include: [{
        model: db.model('story'),
        attributes: {exclude: ['paragraphs']}
      }]
    })
  },
  instanceMethods: {
    hashPassword: function (plaintext) {
      return crypto.pbkdf2Sync(plaintext, this.salt, 10000, 64).toString('base64');
    },
    isValidPassword: function (attempt) {
      console.log(attempt);
      console.log(this.password);
      console.log(this.hashPassword(attempt));
      return this.hashPassword(attempt) === this.password;
    }
  }
});

module.exports = User;
