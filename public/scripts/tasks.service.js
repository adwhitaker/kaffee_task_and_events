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

  // add a new task to the DB
  this.addTask = function (item, startDate) {
      var tasksObject = { item: item,
                        start_date: startDate,
                      };

      return $http.post('/tasks', tasksObject)
         .then(function () {
                console.log('success');
                return;
              },

           errorCallback);
    };

  // delete tasks
  this.deleteTask = function (id) {
    return $http.delete('/tasks/' + id)
    .then(function () {
        return;
      },

        errorCallback);
  };;
};

// callback error function
function errorCallback(error) {
  console.log('error making http request', error);
};
