angular.module('tasksApp')
       .controller('CompleteController', CompleteController);

function CompleteController($http, tasksService) {
  console.log('CompleteController loaded');
  var complete = this;

  complete.items = tasksService;

  complete.updateTask = function (id, item, complete, startDate) {
    tasksService.updateTask(id, item, complete, startDate)
                .then(function () {
                  tasksService.getTasks();
                });
  };

  // delete tasks from DB
  // daily.deleteTask = function (id) {
  //   tasksService.deleteTask(id)
  //               .then(function () {
  //                 tasksService.getTasks();
  //               });
  // };

};
