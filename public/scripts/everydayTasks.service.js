angular.module('tasksApp')
       .service('everyDayTasksService', everyDayTasksService);

function everyDayTasksService($http) {
  var that = this;

  // the returned everyday tasks are stored in this array
  // and then displayed on the DOM in index.html and settings.html
  var tasks = {
    boxTasks: [],
  };

  that.boxTopTasks = tasks;

  // get everyday tasks from DB
  that.getEveryDayTasks = function () {
    $http.get('/dailytasks').then(printEverydayTasks, errorCallback);
  };

  function printEverydayTasks(response) {
    tasks.boxTasks = response.data;
  };

  // add everyday task to the DB
  that.addDailyTask = function (item1, amount, item2) {
    var dailyTaskObject = {
      item1: item1,
      amount: amount,
      item2: item2,
    };

    return $http.post('/dailytasks', dailyTaskObject)
         .then(function (response) {
            return;
          },

         errorCallback
       );
  };

  // update everyday task in DB
  that.updateDailyTask = function (id, item1, amount, item2, complete) {
    var dailyTaskObject = {
      item1: item1,
      amount: amount,
      item2: item2,
      complete: complete,
    };

    return $http.put('/dailytasks/' + id, dailyTaskObject)
         .then(function (response) {
            return;
          },

        errorCallback
      );
  };

  // delete everyday task in DB
  that.deleteDailyTask = function (id) {

      return $http.delete('dailytasks/' + id)
           .then(function (response) {
              return;
            });
    };
};

// callback error function
function errorCallback(error) {
  console.log('error making http request', error);
};
