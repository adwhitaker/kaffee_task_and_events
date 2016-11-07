angular.module('tasksApp')
       .service('everyDayTasksService', everyDayTasksService);

function everyDayTasksService($http) {
  var that = this;

  var tasks = {
    boxTasks: [],
  };

  this.boxTopTasks = tasks;

  // get everyday tasks from DB
  this.getEveryDayTasks = function () {
    $http.get('/dailytasks').then(printEverydayTasks, errorCallback);
  };

  function printEverydayTasks(response) {
    tasks.boxTasks = response.data;
  };

  // add everyday task to the DB
  this.addDailyTask = function (item1, amount, item2) {
    var dailyTaskObject = {
      item1: item1,
      amount: amount,
      item2: item2,
    };

    return $http.post('/dailytasks', dailyTaskObject)
         .then(function (response) {
            console.log('added');
            return;
          },

         errorCallback
       );
  };

  this.updateDailyTask = function (id, item1, amount, item2) {
    var dailyTaskObject = {
      item1: item1,
      amount: amount,
      item2: item2,
    };

    return $http.put('/dailytasks/' + id, dailyTaskObject)
         .then(function (response) {
            console.log('updated', response);
            return;
          },

        errorCallback
      );
  };

  this.deleteDailyTask = function (id) {

      return $http.delete('dailytasks/' + id)
           .then(function (response) {
              console.log('deleted!');
              return;
            });
    };
};

function errorCallback(error) {
  console.log('error making http request', error);
};
