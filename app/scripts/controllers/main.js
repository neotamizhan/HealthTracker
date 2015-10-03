'use strict';

/**
 * @ngdoc function
 * @name healthTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the healthTrackerApp
 */
angular.module('healthTrackerApp')
  .controller('MainCtrl', function ($scope, Users) {

    $scope.FetchAllUsers = function () {
        Users.all().then(function (all_users) {
          $scope.users = all_users;
        })
    }

    $scope.FetchAllUsers();
  });
