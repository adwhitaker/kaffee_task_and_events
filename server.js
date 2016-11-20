require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2');
const path = require('path');
const auth = require('./auth/setup');
const session = require('express-session');

const sessionConfig = require('./auth/sessionConfig');
const googleAuth = require('./routes/googleAuth');
const googleCalendar = require('./routes/googleCalendar');
const tasks = require('./routes/tasks');
const dailyTasks = require('./routes/dailyTasks');
const logout = require('./routes/logout');

var app = express();

// middleware
auth.setup();
app.use(session(sessionConfig.sessionConfig));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

// route connections
app.use('/auth/google', googleAuth);
app.use('/calendar', googleCalendar);
app.use('/tasks', tasks);
app.use('/dailytasks', dailyTasks);
app.use('/logout', logout);

// is authenticated
app.get('/*', function (req, res) {
  if (req.isAuthenticated()) {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
  } else {
    res.redirect('/auth/google');
  }
});

// server connection
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Listening on port', port);
});
