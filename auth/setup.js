const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const User = require('../models/user');
const authorization = require('../db/auth');

exports.setup = function () {
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
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
    authorizationURL: authorization.googleAuth.authorizationURL,
    tokenURL: authorization.googleAuth.tokenURL,
    clientID: authorization.googleAuth.clientID,
    clientSecret: authorization.googleAuth.clientSecret,
    callbackURL: authorization.googleAuth.callbackURL,
  },
  function (accessToken, refreshToken, profile, cb) {
    findOrCreate(profile.id, accessToken, refreshToken, function (err, user) {
      return cb(err, user);
    });
  }
));

};

// checks DB if the user is in the system
// if they are not it creates a new entry in the DB
// and saves the googleID, accessToken, and refreshToken
function findOrCreate(googleID, accessToken, refreshToken, done) {
  User.findById(googleID, accessToken, refreshToken).then(function (user) {
      if (user) {
        User.updateTokens(googleID, accessToken, refreshToken);
        return done(null, user);
      }

      if (!user) {
        User.create(googleID, accessToken, refreshToken).then(function (user) {
          return done(null, user);
        });

      };

    }).catch(function (err) {
      console.log('Error finding user', err);
      done(err);
    });

};
