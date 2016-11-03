const router = require('express').Router();
const passport = require('passport');

var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;

const auth = require('../db/auth');

var calendar = google.calendar('v3');

var oauth2Client = new OAuth2(
  auth.googleAuth.clientID,
  auth.googleAuth.clientSecret,
  auth.googleAuth.callbackURL
);

router.get('/', getCalendarEvents);

function getCalendarEvents(req, res) {
  var newMinTime = req.params.newMinTime;
  console.log(req.body.params, req.body.newMinTime, req.params.newMinTime);

  console.log('NEW MIN TIME:', newMinTime);

  oauth2Client.setCredentials({
    access_token: req.user.accesstoken,
    refresh_token: req.user.refreshtoken,
  });
  listEvents(oauth2Client, newMinTime).then(function (futureEvents) {
    res.send(futureEvents);
  }).catch(function (err) {
    console.log('err', err);
    res.sendStatus(500);
  });
};

function listEvents(auth, newMinTime) {
  return new Promise(function (resolve, reject) {

    calendar.events.list({
      auth: auth,
      calendarId: 'primary',
      timeMin: newMinTime,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        return reject(err);
      }

      var events = response.items;

      // console.log('response.items', events);

      return resolve(events);

      if (events.length == 0) {
        console.log('No upcoming events found.');
      } else {
        console.log('Upcoming 10 events:');
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var start = event.start.dateTime || event.start.date;
          console.log('%s - %s', start, event.summary);
        }
      }
    });

  });
}

module.exports = router;
