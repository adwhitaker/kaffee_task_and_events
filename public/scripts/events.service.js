angular.module('tasksApp')
       .service('eventsService', eventsService);

function eventsService($http) {
  var that = this;

  // object where the events for the week are sorted
  // after being retrieved from Google Calendar and displayed in weekly.html
  var days = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };

  that.week = days;

  // weekly.html header containing previous Sunday date
  that.sunday;

  // http request getting events from Google Calendar
  that.getCalendarEvents = function () {

    // setting the variables for begining and end of the week
    // using moments.js
    var newMoment = moment();
    var foundSunday = findSunday(newMoment);
    var newMinimumTime = newMoment.subtract(foundSunday, 'days').format();
    that.sunday = moment(newMinimumTime).format('MMM Do YYYY');
    var newMaxTime = newMoment.add(6, 'days').format();

    return $http.get('/calendar', {
      params: {
        newMinTime: newMinimumTime,
        newMaxTime: newMaxTime,
      },
    }).then(printEvents, errorCallback);
  };

  // function to add events returned from Google Calendar to their appropriate
  // day in that.week
  function printEvents(response) {
    response.data.forEach(function (event) {

      // checks if it is a date is a multi or single day event
      if (!event.start.dateTime) {
        var multiDay = moment(event.start.date).format('dddd').toLowerCase();

        // this function currently avoids adding multi-day events to that.week

      } else {
        var day = moment(event.start.dateTime).format('dddd').toLowerCase();
        that.week[day].push(event);
      }

    });

    return;
  };

};

// takes in a day and finds the closet previous Sunday using moments.js
function findSunday(newTime) {
  if (moment(newTime).format('dddd') !== 'Sunday') {

    for (var i = 1; i < 7; i++) {
      if (moment(newTime).subtract(i, 'days').format('dddd') === 'Sunday') {
        findSunday = i;
        break;
      }

    };
  }

  return i;
}

// callback error function
function errorCallback(error) {
  console.log('error making http request', error);
};
