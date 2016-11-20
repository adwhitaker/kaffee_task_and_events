const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const User = require('../models/user');

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
    authorizationURL: process.env.AUTHORIZATION_URL,
    tokenURL: process.env.TOKEN_URL,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
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
