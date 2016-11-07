angular.module('tasksApp')
       .service('settingsService', settingsService)

function settingsService($http) {
  var settings = this;

  settings.addDailyTask = function(item1, amount, item2) {
    
  };
};

// callback error function
function errorCallback(error) {
  console.log('error making http request', error);
};
