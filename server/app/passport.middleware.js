const passport = require('passport');
const User = require('../api/users/user.model');
const router = require('express').Router();

router.use(passport.initialize()); // init passport so we can start register functions
router.use(passport.session()); // wraps around session store ==> deserializeUser

passport.serializeUser(function (user, done) {
  done(null, user.id); // saves user.id to the session store associated with this connection (cookie)
});

passport.deserializeUser(function (id, done) { // we serialize and id, so I named the first param id
  User.findById(id) 
  // done(error, success)
  .then(user => done(null, user)) // req.user === undefined ; req.user === user
  .catch(done);
});

module.exports = router;
