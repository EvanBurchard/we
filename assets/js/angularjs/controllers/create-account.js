"use strict";

angular.module("application").controller("CreateAccountCtrl", [
  "$scope", '$http', "$location", function($scope, $http, $location) {
    var errorHandler, init, loginHandler, logoutHandler;

    $scope.user = {};
    $scope.errors = {};

    $scope.submit = function(event) {
      event.preventDefault();
      event.stopPropagation();

      console.log($scope.user);
      console.log($scope);
      $http({
          method: 'POST',
          url: '/signup',
          data: {
            'name': $scope.user.name,
            'email': $scope.user.email,
            'password': $scope.user.password,
            'confirmPassword': $scope.user.confirmPassword
          }
        }).success(function(data, status, headers, cfg) {
          if(status = 200){
            // good, redirect
            $window.location.url('/dashboard')
          } else {
            console.log(data);
            $scope.errors.push(data.error);
            // error
          }
          console.log(data);
          console.log(status);

        }).error(function(data, status, headers, cfg) {
          console.log(data);
          console.log(status);
        });
    };
  }
]);
