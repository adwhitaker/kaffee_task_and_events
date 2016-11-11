angular.module('tasksApp')
       .controller('SettingsController', SettingsController);

function SettingsController(everyDayTasksService) {
  var settings = this;

  // add a daily task to the DB
  settings.addDailyTask = function (item1, amount, item2) {
    everyDayTasksService.addDailyTask(item1, amount, item2)
                        .then(function () {
                          settings.item1 = '';
                          settings.amount = '';
                          settings.item2 = '';
                          everyDayTasksService.getEveryDayTasks();
                        });
  };

  // update a daily task in the DB
  settings.updateDailyTask = function (id, item1, amount, item2) {
    var complete = false;

    everyDayTasksService.updateDailyTask(id, item1, amount, item2, complete)
                      .then(function () {
                          everyDayTasksService.getEveryDayTasks();
                        });
  };

  // delete daily task in the DB
  settings.deleteDailyTask = function (id) {
    everyDayTasksService.deleteDailyTask(id)
                        .then(function () {
                          everyDayTasksService.getEveryDayTasks();
                        });
  };
};
