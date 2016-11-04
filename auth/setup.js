const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');

//const config = require('module');
const User = require('../models/user');

exports.setup = function () {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    console.log('serialize:', user);
    done(null, user.googleid);

  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {
      return done(null, user);
    }).catch(function (err) {
      done(err);
    });
  });

  passport.use(new GoogleStrategy({
    authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
    tokenURL: 'https://accounts.google.com/o/oauth2/token',
    clientID: '429460958775-eif0fbjcajta9th94g0blhestho2co2m.apps.googleusercontent.com',
    clientSecret: 'eHuV3IYNmOQEpNvW1Lg5ELI1',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    findOrCreate(profile.id, accessToken, refreshToken, function (err, user) {
      return cb(err, user);
    });
  }
));

};

// @TODO: is the return done right?
function findOrCreate(googleID, accessToken, refreshToken, done) {
  // return new Promise(function (resolve, reject) {
  User.findById(googleID, accessToken, refreshToken).then(function (user) {
      if (user) {
        User.updateTokens(googleID, accessToken, refreshToken);
        return done(null, user);
      }

      if (!user) {
        User.create(googleID, accessToken, refreshToken).then(function (user) {
          console.log('create user', user);
          return done(null, user);
        });

        // return done(null, googleID.googleid);
      };

      // @TODO how do I set this up if undefined is returned
    }).catch(function (err) {
      console.log('Error finding user', err);
      done(err);
    });

  // });
}