angular.module('tasksApp')
       .config(configTasks);

function configTasks($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/daily', {
    templateUrl: 'views/daily.html',
    controller: 'DailyController as daily',
  }).when('/weekly', {
    templateUrl: 'views/weekly.html',
    controller: 'WeeklyController as weekly',
  }).when('/settings', {
    templateUrl: 'views/settings.html',
    controller: 'SettingsController as settings',
  }).otherwise({
    templateUrl: 'views/daily.html',
    controller: 'DailyController as daily',
  });
};
