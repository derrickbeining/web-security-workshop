const router = require('express').Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const User = require('../users/user.model');

passport.use(new GitHubStrategy({
  clientID: '6070304fd627e594fbb1',
  clientSecret: '592efd0f785508c3dc0c9376e04605ddd7a6bd76',
  callbackURL: '/api/auth/github/verify'
}, function (token, refreshToken, profile, done) {
  // github may not provide an email, if so we'll just fake it
  var email = profile.emails ? profile.emails[0].value : [profile.username , 'fake-auther-email.com'].join('@');
  var photo = profile.photos ? profile.photos[0].value : undefined;
  var info = {
    name: profile.displayName,
    email: email,
    photo: photo
  };
  User.findOrCreate({
    where: {githubId: profile.id},
    defaults: info
  })
  .spread(function (user) {
    done(null, user);
  })
  .catch(done);
}));

router.get('/', passport.authenticate('github'));

router.get('/verify',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect(`/users/${req.user.id}`);
  }
);

module.exports = router;