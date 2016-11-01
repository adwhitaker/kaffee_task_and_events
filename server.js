const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const path = require('path');
const auth = require('./auth/setup');
const session = require('express-session');
const googleAuth = require('./routes/googleAuth');

var app = express();

const sessionConfig = {
  secret: 'super secret key goes here', // TODO this should be read from ENV
  key: 'user',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
    secure: false,
  },
};

auth.setup();
app.use(session(sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());

app.use('/auth/google', googleAuth);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

var server = app.listen(3000, function () {
  console.log('Listening on port', server.address().port);
});
