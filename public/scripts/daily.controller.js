angular.module('tasksApp')
       .controller('DailyController', DailyController);

function DailyController($http, tasksService, eventsService) {
  var daily = this;

  // this is the current date that is displayed on daily.html
  daily.currentTime = moment().format('LL');

  // tasks to be displayed on the DOM in daily.html
  daily.items = tasksService;

  // events to be displayed on the DOM in daily.html
  var today = moment().format('dddd').toLowerCase();
  daily.events = eventsService.week[today];

  // gets tasks from DB
  daily.getTasks = function () {
    tasksService.getTasks();
  };

  // add a task to the DB
  // resets the fields in the form to '' after submit
  daily.addTask = function (item, startDate) {

    if (!startDate) {
      startDate = moment().format('L');
    }

    tasksService.addTask(item, startDate)
                .then(function () {
                  daily.getTasks();
                  daily.item = '';
                  daily.item = '';
                  daily.startDate = '';
                });
  };

  // update a task in the DB
  daily.updateTask = function (id, item, complete, startDate) {
    tasksService.updateTask(id, item, complete, startDate)
                .then(function () {
                  tasksService.getTasks();
                });
  };

  // delete tasks from DB
  daily.deleteTask = function (id) {
    tasksService.deleteTask(id)
                .then(function () {
                  tasksService.getTasks();
                });
  };
};
