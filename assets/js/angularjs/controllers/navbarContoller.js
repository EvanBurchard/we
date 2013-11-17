"use strict";

angular.module("application")
.controller("navbarContoller", [
  "$rootScope",
  "$scope",
  "SessionService",
  function($rootScope, $scope, SessionService) {
    var init;
    $scope.user = {};
    $rootScope.$watch('user', function(newValue, oldValue) {
      $scope.user = newValue;
    });
  }

]);

