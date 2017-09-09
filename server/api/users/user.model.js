'use strict';

var Sequelize = require('sequelize');
const crypto = require('crypto')


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
    validate: {
      hasLocalAuthOrOAuth () {
        if (!(this.password || this.googleId || this.twitterId || this.githubId)) {
          throw new Error('Password cannot be null if OAuth not enabled')
        }
      }
    },
    set (userPassword) {
      this.setDataValue('password', hashSaltAndPassword(this.salt, userPassword))
    }
  },
  salt: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: function () {
      return crypto.randomBytes(16).toString('base64')
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
      populated: () => ({
        include: [ {
          model: db.model('story'),
          attributes: {exclude: [ 'paragraphs' ]}
        }]
      })
    }
  });

User.Instance.prototype.isPasswordAuthenticated = function (password) {
  return hashSaltAndPassword(this.salt, password) === this.password
}

function hashSaltAndPassword (salt, password) {
  const iterations = 1000
  const bytes = 64
  const digest = 'RSA-SHA256'
  return crypto.pbkdf2Sync(
    password,
    salt,
    iterations,
    bytes,
    digest
  ).toString('base64')
}

module.exports = User;
