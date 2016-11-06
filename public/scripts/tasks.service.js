angular.module('tasksApp')
       .service('tasksService', tasksService);

function tasksService($http) {

  // get tasks
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

    return todos;
  } // end of get tasks

  // delete tasks
  this.deleteTask = function (id) {
    return $http.delete('/tasks/' + id)
    .then(function () {
        return;
      },

        errorCallback);
  };
};

// callback error function
function errorCallback(error) {
  console.log('error making http request', error);
};
