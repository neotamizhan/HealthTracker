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

    $scope.signedIn = true;

    $scope.FetchAllUsers = function () {
        Users.all().then(function (all_users) {
          $scope.users = all_users;
        })
    }

    $scope.isLoggedUser = function (user) {
      return $scope.logged_email == user.id;
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

   // Here we do the authentication processing and error handling.
   // Note that authResult is a JSON object.
   $scope.processAuth = function(authResult) {
       // Do a check if authentication has been successful.
       console.log(authResult);
       if(authResult['access_token']) {
           // Successful sign in.
           $scope.signedIn = true;
           $scope.getUserInfo();
           //     ...
           // Do some work [1].
           //     ...
       } else if(authResult['error']) {
           // Error while signing in.
           $scope.signedIn = false;

           // Report error.
       }
   };

   $scope.signOut = function () {
     gapi.auth.signOut();
     $scope.signedIn = false;
   }

   $scope.processUserInfo = function(userInfo) {

       // Or use his email address to send e-mails to his primary e-mail address.
       $scope.logged_email = userInfo['emails'][0]['value'];

       console.log($scope.logged_user);
   }

   // When callback is received, process user info.
   $scope.userInfoCallback = function(userInfo) {
       $scope.$apply(function() {
           $scope.processUserInfo(userInfo);
       });
   };

   // Request user info.
   $scope.getUserInfo = function() {
       gapi.client.request(
           {
               'path':'/plus/v1/people/me',
               'method':'GET',
               'callback': $scope.userInfoCallback
           }
       );
   };

   // When callback is received, we need to process authentication.
   $scope.signInCallback = function(authResult) {
       $scope.$apply(function() {
           $scope.processAuth(authResult);
       });
   };
    // Render the sign in button.
    $scope.renderSignInButton = function() {
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '503260251941-0ro1k4avns1u2hm321vh7n231urcr3mb.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin'
            }
        );
    }


        // Start function in this example only renders the sign in button.
    $scope.start = function() {
      $scope.renderSignInButton();
      $scope.FetchAllUsers();
    };

    // Call start function on load.
    $scope.start();

  });
