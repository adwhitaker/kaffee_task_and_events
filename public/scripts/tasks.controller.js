angular.module('tasksApp')
       .controller('TasksController', TasksController);

function TasksController($http, tasksService, eventsService, everyDayTasksService) {
  console.log('TasksController loaded');
  var tasks = this;

  tasks.boxTasks = everyDayTasksService;

  tasks.logout = function () {
    window.location = '/logout';
  };

  tasks.completeDaily = function (id, item1, amount, item2, complete) {
    var completeOpposite = !complete;

    everyDayTasksService.updateDailyTask(id, item1, amount, item2, completeOpposite)
                        .then(function () {
                          everyDayTasksService.getEveryDayTasks();
                        });
  };

  tasksService.getTasks();
  eventsService.getCalendarEvents();
  everyDayTasksService.getEveryDayTasks();
};
