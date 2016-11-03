angular.module('tasksApp')
       .controller('TasksController', TasksController);

function TasksController($http) {
  console.log('TasksController loaded');
  var tasks = this;

  tasks.getEverydayTasks = function () {
    $http.get('/dailytasks').then(printEverydayTasks, errorCallback);
  };

  tasks.getEverydayTasks();
};

function errorCallback(error) {
  console.log('error making http request', error);
};

function printEverydayTasks(response) {
  console.log('daily tasks', response);
};
