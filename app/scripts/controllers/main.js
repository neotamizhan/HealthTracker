'use strict';

/**
 * @ngdoc function
 * @name healthTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the healthTrackerApp
 */
angular.module('healthTrackerApp')
  .controller('MainCtrl', function ($scope, $modal, Users) {

    $scope.FetchAllUsers = function () {
        Users.all().then(function (all_users) {
          $scope.users = all_users;
        })
    }

    $scope.GetBmi = function (user, entry) {
      if (!entry) return 0;
      var height_m = user.height / 100;
      return entry.weight / (height_m * height_m);
    }

    $scope.addEntry = function (user) {
      var weight = prompt("Enter your weight as of now");
      var entry = {date:new Date().toISOString().slice(0, 10), weight:weight};
      user.entries.push(entry);
      user.$save();
    }

    $scope.initialBmi = function (user) {
        var entry = user.entries[0];
        return $scope.GetBmi(user, entry);
    }

    $scope.currentBmi = function (user) {
        var entry = user.entries[user.entries.length-1];
        return $scope.GetBmi(user, entry);
    }

    $scope.bmiNetDiff = function (user) {
      return $scope.initialBmi(user) - $scope.currentBmi(user);
    }

    $scope.getBmiColor = function (bmi) {
      var color = "";

      if (bmi >= 18.5 && bmi <= 24.9) {color = "success"}
      if (bmi >= 25 && bmi <= 29.9) {color = "warning"}
      if (bmi >= 30) {color = "danger"}

      return color;
    }

    $scope.FetchAllUsers();
  });
