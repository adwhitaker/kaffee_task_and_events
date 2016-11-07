angular.module('tasksApp')
       .service('eventsService', eventsService);

function eventsService($http) {
  var that = this;

  var days = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };

  this.week = days;

  this.getCalendarEvents = function () {
    var newMoment = moment();
    var foundSunday = findSunday(newMoment);
    var newMinimumTime = newMoment.subtract(foundSunday, 'days').format();
    var newMaxTime = newMoment.add(6, 'days').format();

    return $http.get('/calendar', {
      params: {
        newMinTime: newMinimumTime,
        newMaxTime: newMaxTime,
      },
    }).then(printEvents, errorCallback);
  };

  function printEvents(response) {
    response.data.forEach(function (event) {

      // checks if it is a date is a multi or single day event
      if (!event.start.dateTime) {
        console.log('multiple day event', moment(event.start.date).format('dddd'), event.start.date, 'to', moment(event.end.date).format('dddd'), event.end.date);
        var multiDay = moment(event.start.date).format('dddd').toLowerCase();
        // weekly.day[day].push(event);

      } else {
        console.log('event', moment(event.start.dateTime).format('dddd'), 'until', moment(event.end.dateTime).format('dddd'));
        var day = moment(event.start.dateTime).format('dddd').toLowerCase();
        console.log('sunday', that.week.sunday);
        that.week[day].push(event);
      }

    });

    return;
  };

  this.getCalendarEvents();
};

// takes in a day and finds the closet previous Sunday
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
