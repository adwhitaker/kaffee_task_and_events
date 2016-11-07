angular.module('tasksApp')
       .controller('DailyController', DailyController);

function DailyController($http, tasksService, eventsService) {
  console.log('DailyController loaded');
  var daily = this;

  daily.items = [];

  // gets tasks from DB
  daily.getTasks = function () {
    tasksService.getTasks()
                .then(printTasks);
  };

  function printTasks(response) {
    daily.items = response;
  }

  // add a task to the DB
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
                  daily.getTasks();
                });
  };

  // delete tasks from DB
  daily.deleteTask = function (id) {
    tasksService.deleteTask(id)
                .then(function () {
                  daily.getTasks();
                });
  };

  daily.getTasks();

  var today = moment().format('dddd').toLowerCase();
  daily.events = eventsService.week[today];

};
