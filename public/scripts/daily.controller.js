angular.module('tasksApp')
       .controller('DailyController', DailyController);

function DailyController($http) {
  console.log('DailyController loaded');
  var daily = this;

  daily.isNavCollapsed = true;
  daily.isCollapsed = true;

  daily.startDate = 'mm/dd/yyyy';
  daily.endDate = 'mm/dd/yyyy';
  daily.date = new Date();
  daily.task = '';

  daily.items = [];

  daily.getTasks = function () {
    console.log('button clicked');
    $http.get('/tasks')
         .then(printTasks, errorCallback);
  };

  function printTasks(response) {
    console.log('tasks get response', response.data[0]);
    daily.items = response.data;
    console.log('daily.items', daily.items[0].item);
  }

  daily.addTask = function (item, dateCheckbox, startDate, singleDay, endDate) {
    var taskItem = item;
    var taskStartDate;
    var taskEndDate;

    if (dateCheckbox) {
      taskStartDate = moment(startDate, 'mm/dd/yyyy').format('L');
      console.log('startdate', taskStartDate);
    }

    if (dateCheckbox && singleDay) {
      taskEndDate = moment(endDate, 'mm/dd/yyyy').format('L');
      console.log('enddate', taskEndDate);
    }

    console.log('Task:', taskItem, ', start date:', taskStartDate, ', end date', taskEndDate);
    var tasksObject = { item: taskItem, start_date: taskStartDate, end_date: taskEndDate };

    $http.post('/tasks', tasksObject)
         .then(function () {
          console.log('success');
        },

         function (err) {
          console.log(err);
        });
  };

  daily.getTasks();
};

function errorCallback(error) {
  console.log('error making http request', error);
};
