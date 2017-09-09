const router = require('express').Router();
const passport = require('passport');
const TwitterStrategy = require('passport-twitter');

const User = require('../users/user.model');

passport.use(new TwitterStrategy({
  consumerKey: 'C7OcJOxEPy3YAQSsO2kSWER1f',
  consumerSecret: 'NxULJqRe68vdDEu6bErj8CaFNE4vrHUx1xNpdbPr0A4RxIRBAE',
  callbackURL: '/api/auth/twitter/verify'
}, function (token, refreshToken, profile, done) {
  // twitter may not provide an email, if so we'll just fake it
  var email = profile.emails ? profile.emails[ 0 ].value : [ profile.username, 'fake-auther-email.com' ].join('@');
  var photo = profile.photos ? profile.photos[ 0 ].value : undefined;
  var info = {
    name: profile.displayName,
    email: email,
    photo: photo,
  };
  User.findOrCreate({
    where: {twitterId: profile.id},
    defaults: info
  })
    .spread(function (user) {
      done(null, user);
    })
    .catch(done);
}));

router.get('/', passport.authenticate('twitter'));

router.get('/verify',
  passport.authenticate('twitter', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect(`/users/${req.user.id}`);
  }
);

module.exports = router;
