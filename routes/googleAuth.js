const router = require('express').Router();
const passport = require('passport');

router.get('/',
  passport.authenticate('google', { scope:
    ['https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read']}
  ));

router.get('/callback',
  passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/auth/google/failure',
  }));

module.exports = router;
