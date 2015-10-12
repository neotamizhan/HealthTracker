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

    $scope.open = function (user) {
    $scope.user = user;
                  $modal.open({
                      templateUrl: 'entryContent.html',
                      backdrop: true,
                      windowClass: 'modal',
                      controller: function ($scope, $modalInstance, $log, user) {
                          $scope.entry = {date:new Date().toISOString().slice(0, 10), weight:0};
                          $scope.user = user;
                          $scope.submit = function () {
                              $log.log('Submiting user info.');
                              $log.log(JSON.stringify($scope.entry));
                              $log.log(JSON.stringify($scope.user));
                              $scope.user.entries.push($scope.entry)
                              $scope.user.$save();
                              $modalInstance.dismiss('cancel');
                          }

                          $scope.cancel = function () {
                              $modalInstance.dismiss('cancel');
                          };
                      },

                      resolve: {
                          user: function () {
                              return $scope.user;
                          }
                      }
                  });
                }

    $scope.FetchAllUsers();
  });
