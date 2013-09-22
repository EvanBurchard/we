"use strict";


angular.module("application").controller("LoginCtrl", [
  "$rootScope", "$scope", "$location", "SessionService", function($rootScope, $scope, $location, SessionService) {
    var errorHandler, init, loginHandler, logoutHandler;
    init = function() {
      $scope.templates = [ { name: 'login-form.html', url: 'templates/login-form.ejs'} ]
      $scope.template = $scope.templates[0];

      return $scope.user = SessionService.getUser();
    };
    loginHandler = function(res) {
      if (SessionService.authorized(res)) {
        $scope.message = "Authorized!";
        $rootScope.user = SessionService.getUser();
        $scope.user = SessionService.getUser();
        return $location.path("/users");
      } else {
        return $scope.message = "Invalid username or password!";
      }
    };
    logoutHandler = function(res) {
      var user;
      $scope.message = "Logged Out!";
      user = {
        name: '',
        email: ''
      };
      $scope.user = user;
      $rootScope.user = user;
      return $location.path("/login");
    };
    errorHandler = function(err) {
      return $scope.message = "Error! " + err;
    };
    $scope.login = function() {
      return SessionService.login($scope.user, loginHandler, errorHandler);
    };
    $scope.logout = function() {
      return SessionService.logout($scope.user, logoutHandler, errorHandler);
    };
    $scope.showMessage = function() {
      return $scope.message && $scope.message.length;
    };
    return init();
  }
]);
