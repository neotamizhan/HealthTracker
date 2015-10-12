'use strict';

/**
 * @ngdoc overview
 * @name healthTrackerApp
 * @description
 * # healthTrackerApp
 *
 * Main module of the application.
 */
angular
  .module('healthTrackerApp', [
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mongolabResourceHttp',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).constant('MONGOLAB_CONFIG',{API_KEY:'aMlGO8KWJ4e8mUK3fneg1GAFyDB3823m', DB_NAME:'contest'})
  .factory('Users', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('users');
  });
