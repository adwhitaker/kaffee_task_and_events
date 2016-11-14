var authConfigs = {
    googleAuth: {
      authorizationURL: 'https://accounts.google.com/o/oauth2/auth',
      tokenURL: 'https://accounts.google.com/o/oauth2/token',
      clientID: ,
      clientSecret: ,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },

    sessionVars: {
      secret: '',
    },
  };

module.exports = authConfigs;
