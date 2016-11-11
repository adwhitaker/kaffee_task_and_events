angular.module('tasksApp')
       .controller('WeeklyController', WeeklyController);

function WeeklyController($http, eventsService, tasksService) {

  var weekly = this;

  // display calendar and previous Sunday date in weekly.html
  weekly.days = eventsService.week;
  weekly.sunday = eventsService.sunday;

  // get calendar events from Google Calendar
  weekly.getCalendarEvents = function () {
    eventsService.getCalendarEvents();
  };

};
