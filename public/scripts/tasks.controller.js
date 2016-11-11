angular.module('tasksApp')
       .controller('TasksController', TasksController);

function TasksController($http, tasksService, eventsService, everyDayTasksService) {
  var tasks = this;

  // everyday tasks displayed index.html
  tasks.boxTasks = everyDayTasksService;

  tasks.logout = function () {
    window.location = '/logout';
  };

  // function to update completed daily tasks once click in index.html
  tasks.completeDaily = function (id, item1, amount, item2, complete) {
    var completeOpposite = !complete;

    everyDayTasksService.updateDailyTask(id, item1, amount, item2, completeOpposite)
                        .then(function () {
                          everyDayTasksService.getEveryDayTasks();
                        });
  };

  // initial http requests to get tasks and events from DB and Google Calendar
  tasksService.getTasks();
  eventsService.getCalendarEvents();
  everyDayTasksService.getEveryDayTasks();
};
