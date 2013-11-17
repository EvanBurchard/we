"use strict";

angular.module("application")
.controller("homeController", [
  "$rootScope",
  "$scope",
  "SessionService",
  function($rootScope, $scope, SessionService) {
    var init;

    init = function() {
      console.log($rootScope) ;
      console.log($scope);
       console.log('user',SessionService.user);
    }

    //init();
  }

]);

