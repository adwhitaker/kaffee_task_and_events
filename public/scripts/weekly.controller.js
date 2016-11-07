angular.module('tasksApp')
       .controller('WeeklyController', WeeklyController);

function WeeklyController($http, eventsService) {
  console.log('WeeklyController loaded');
  var weekly = this;

  weekly.days = eventsService.week;

  weekly.getCalendarEvents = function () {
    // var newMoment = moment();
    eventsService.getCalendarEvents()
      .then(function (response) {
        console.log('respnse', response);
      })
  }

  // weekly.getCalendarEvents();

};
