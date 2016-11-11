angular.module('tasksApp')
       .controller('CompleteController', CompleteController);

function CompleteController($http, tasksService) {
  var complete = this;

  complete.items = tasksService;

  // function to update the completed task up not complete
  // once the task is set to not complete tasksService gets tasks from the DB
  // and updates the DOM
  complete.updateTask = function (id, item, complete, startDate) {
    tasksService.updateTask(id, item, complete, startDate)
                .then(function () {
                  tasksService.getTasks();
                });
  };

};
