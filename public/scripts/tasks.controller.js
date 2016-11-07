angular.module('tasksApp')
       .controller('TasksController', TasksController);

function TasksController($http, tasksService, eventsService) {
  console.log('TasksController loaded');
  var tasks = this;

  tasks.boxTasks = [];

  tasks.getEverydayTasks = function () {
    $http.get('/dailytasks').then(printEverydayTasks, errorCallback);
  };

  function printEverydayTasks(response) {
    tasks.boxTasks = response.data;

  };

  tasksService.getTasks();
  eventsService.getCalendarEvents();
  tasks.getEverydayTasks();
};

function errorCallback(error) {
  console.log('error making http request', error);
};
