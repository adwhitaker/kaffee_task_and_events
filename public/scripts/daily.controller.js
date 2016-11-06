angular.module('tasksApp')
       .controller('DailyController', DailyController);

function DailyController($http, tasksService) {
  console.log('DailyController loaded');
  var daily = this;

  daily.items = [];
  // daily.tasksService = tasksService;

  daily.updateTask = function (id, item, complete, startDate, endDate) {

    if (complete) {
      endDate = moment().format('L');
    } else {
      endDate = null;
    }

    var taskUpdate = { item: item,
                        complete: complete,
                        start_date: startDate,
                        end_date: endDate, };

    console.log('taskUpdate', taskUpdate);
    $http.put('/tasks/' + id, taskUpdate)
    .then(function () {
        console.log('success');
        daily.getTasks();
      },

        errorCallback);
  };

  daily.deleteTask = function (id) {
    tasksService.deleteTask(id)
                .then(function () {
                  daily.getTasks();
                });
  };

  // gets tasks from DB
  daily.getTasks = function () {
    tasksService.getTasks()
                .then(printTasks);
  };

  function printTasks(response) {
    daily.items = response;
  }

  daily.addTask = function (item, startDate, endDate) {

    if (!startDate) {
      startDate = moment().format('L');
    }

    console.log('Task:', item, ', start date:', startDate, ', end date', endDate);
    var tasksObject = { item: item, start_date: startDate, end_date: endDate };

    $http.post('/tasks', tasksObject)
         .then(function () {
          console.log('success');
          daily.getTasks();
        },

         errorCallback);
  };

  daily.getTasks();

  daily.events = [];

  var momentTime = moment();
  var newMinimumTime = momentTime.format();
  var newMaxTime = momentTime.add(1, 'days');
  newMaxTime = newMaxTime.format();

  daily.getCalendarEvents = function (newMinimumTime, newMaxTime) {
    $http.get('/calendar', {
      params: {
        newMinTime: newMinimumTime,
        newMaxTime: newMaxTime,
      },
    }).then(printEvents, errorCallback);
  };

  function printEvents(response) {
    daily.events = response.data;
  };

  daily.getCalendarEvents(newMinimumTime, newMaxTime);

};

function errorCallback(error) {
  console.log('error making http request', error);
};
