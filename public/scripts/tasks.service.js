angular.module('tasksApp')
       .service('tasksService', tasksService);

function tasksService($http) {
  var that = this;

  // tasks returned from the DB stored in either tasks
  var items = {
    tasks: [],
    completed: [],
  };

  that.taskItems = items;

  // get tasks from the DB
  that.getTasks = function () {

    return $http.get('/tasks')
         .then(changeTasksDate, errorCallback);
  };

  // function to format the start date to mm/dd/yyyy
  // and seperate completed and not completed tasks
  function changeTasksDate(response) {
    items.tasks = [];
    items.completed = [];
    var todos = response.data;
    todos.forEach(function (todo) {

      // format start date
      if (todo.start_date) {
        todo.start_date = moment(todo.start_date).format('L');
      }

      // seperate completed and not completed tasks
      if (todo.complete) {
        items.completed.push(todo);
      } else {
        items.tasks.push(todo);
      }
    });

    return;
  };

  // add a new task to the DB
  that.addTask = function (item, startDate) {
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
  that.updateTask = function (id, item, complete, startDate) {
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
  that.deleteTask = function (id) {
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
