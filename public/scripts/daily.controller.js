angular.module('tasksApp')
       .controller('DailyController', DailyController);

function DailyController($http) {
  console.log('DailyController loaded');
  var daily = this;

  daily.items = [];

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
    console.log('id', id);
    $http.delete('/tasks/' + id)
    .then(function () {
        console.log('success');
        daily.getTasks();
      },

        errorCallback);
  };

  daily.getTasks = function () {
    $http.get('/tasks')
         .then(printTasks, errorCallback);
  };

  function printTasks(response) {
    daily.items = response.data;
    daily.items.forEach(function (todo) {
      if (todo.start_date) {
        todo.start_date = moment(todo.start_date).format('L');
      }

      if (todo.end_date) {
        todo.end_date = moment(todo.end_date).format('L');
      }

    });
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
  var newMaxTime = momentTime.add(3, 'days');
  newMaxTime = newMaxTime.format();
  console.log('new max time', newMaxTime);

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
