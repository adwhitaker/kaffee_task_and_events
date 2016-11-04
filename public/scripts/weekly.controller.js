angular.module('tasksApp')
       .controller('WeeklyController', WeeklyController);

function WeeklyController($http) {
  console.log('WeeklyController loaded');
  var weekly = this;

  weekly.events = [];

  weekly.days = {
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
  };

  // fix these variables so that they can be reset
  // place inside of a function 
  var momentTime = moment();
  var foundSunday = findSunday(momentTime);
  var newMinimumTime = momentTime.subtract(foundSunday, 'days').format();
  var newMaxTime = momentTime.add(6, 'days').format();

  weekly.getCalendarEvents = function (newMinimumTime, newMaxTime) {
    $http.get('/calendar', {
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
        weekly.days[day].push(event);
      }

    }); // end of printEvents forEach
  };

  weekly.getCalendarEvents(newMinimumTime, newMaxTime);

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

function errorCallback(error) {
  console.log('error making http request', error);
};
