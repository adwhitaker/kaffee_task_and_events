const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const path = require('path');
const auth = require('./auth/setup');
const session = require('express-session');
const googleAuth = require('./routes/googleAuth');
const googleCalendar = require('./routes/googleCalendar');
const tasks = require('./routes/tasks');
const dailyTasks = require('./routes/dailyTasks');

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
app.use(passport.session());

app.use('/auth/google', googleAuth);
app.use('/calendar', googleCalendar);
app.use('/tasks', tasks);
app.use('/dailytasks', dailyTasks);

app.get('/*', function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
  } else {
    res.redirect('/auth/google');
  }

});

app.get('/test', function (req, res) {
  res.send(req.user);
});

var server = app.listen(3000, function () {
  console.log('Listening on port', server.address().port);
});
