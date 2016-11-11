const router = require('express').Router();
const passport = require('passport');
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
const auth = require('../db/auth');
var calendar = google.calendar('v3');

// new OAuth2 client setup
var oauth2Client = new OAuth2(
  auth.googleAuth.clientID,
  auth.googleAuth.clientSecret,
  auth.googleAuth.callbackURL
);

// router to get events from Calendar
router.get('/', getCalendarEvents);

function getCalendarEvents(req, res) {

  // takes in the time paramaters
  var newMinTime = req.query.newMinTime;
  var newMaxTime = req.query.newMaxTime;

  oauth2Client.setCredentials({
    access_token: req.user.accesstoken,
    refresh_token: req.user.refreshtoken,
  });

  // after setting accessToken and refreshToken
  // runs function listEvents
  listEvents(oauth2Client, newMinTime, newMaxTime).then(function (futureEvents) {
    res.send(futureEvents);
  }).catch(function (err) {
    console.log('err', err);
    res.sendStatus(500);
  });
};

// listEvents function request to Google Calendar API for events
function listEvents(auth, newMinTime, newMaxTime) {
  return new Promise(function (resolve, reject) {

    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: newMinTime,
      timeMax: newMaxTime,
      singleEvents: true,
      orderBy: 'startTime',
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return reject(err);
      }

      // sets returned items as events and returns events
      var events = response.items;
      return resolve(events);

    });

  });
};

module.exports = router;
