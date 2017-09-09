'use strict'

var router = require('express').Router()

var HttpError = require('../../utils/HttpError')
var User = require('./user.model')
var Story = require('../stories/story.model')
const auth = require('../utils/authorizeRequest')

router.param('id', function (req, res, next, id) {
  User.findById(id)
    .then(function (user) {
      if (!user) throw HttpError(404)
      req.requestedUser = user
      next()
      return null
    })
    .catch(next)
})

router.route('/')
  .get(
  function (req, res, next) {
    User.findAll({})
      .then(function (users) {
        res.json(users)
      })
      .catch(next)
  })

  .post(
  auth.mustBeGuestOrAdmin,
  function createNewUser (req, res, next) {
    User.create(req.body)
      .then(function (user) {
        res.status(201).json(user)
      })
      .catch(next)
  })


router.route('/:id')
  .get(function (req, res, next) {
    req.requestedUser.reload(User.options.scopes.populated())
      .then(function (requestedUser) {
        res.json(requestedUser)
      })
      .catch(next)
  })

  .put(
  auth.mustBeSelfOrAdmin,
  function updateUser (req, res, next) {
    req.requestedUser.update(req.body)
      .then(function (user) {
        res.json(user)
      })
      .catch(next)
  })

  .delete(
  auth.mustBeSelfOrAdmin,
  function (req, res, next) {
    req.requestedUser.destroy()
      .then(function () {
        res.status(204).end()
      })
      .catch(next)
  })

module.exports = router
