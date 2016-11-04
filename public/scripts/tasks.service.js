angular.module('tasksApp')
       .service('tasksService', tasksService);

function tasksService($http) {

  this.getTasks = function () {
    return $http.get('/tasks')
         .then(changeTasksDate, errorCallback);
  };

  function changeTasksDate(response) {
    var todos = response.data;
    todos.forEach(function (todo) {
      if (todo.start_date) {
        todo.start_date = moment(todo.start_date).format('L');
      }

    });
    console.log(todos);
    return todos;
  }
};

function errorCallback(error) {
  console.log('error making http request', error);
};
