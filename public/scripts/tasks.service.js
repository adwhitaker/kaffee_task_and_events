angular.module('tasksApp')
       .service('tasksService', tasksService);

function tasksService($http) {
  var that = this;

  this.items = [];

  var items = {
    tasks: [],
  };

  this.taskItems = items;

  // get tasks from the DB
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

    items.tasks = todos;
    return;
  };

  // add a new task to the DB
  this.addTask = function (item, startDate) {
      var tasksObject = { item: item,
                        start_date: startDate,
                      };

      return $http.post('/tasks', tasksObject)
         .then(function () {
                return;
              },

           errorCallback);
    };

  // update task in the DB
  this.updateTask = function (id, item, complete, startDate) {
    var taskUpdate = { item: item,
                        complete: complete,
                        start_date: startDate,
                      };

    return $http.put('/tasks/' + id, taskUpdate)
      .then(function () {
        return;
      },

        errorCallback);

  };

  // delete task in the DB
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
