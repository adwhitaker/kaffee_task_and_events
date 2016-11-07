angular.module('tasksApp')
       .controller('TasksController', TasksController);

function TasksController($http, tasksService, eventsService, everyDayTasksService) {
  console.log('TasksController loaded');
  var tasks = this;

  tasks.boxTasks = everyDayTasksService;

  tasks.logout = function () {
    window.location = '/logout';
  };

  tasksService.getTasks();
  eventsService.getCalendarEvents();
  everyDayTasksService.getEveryDayTasks();
};
