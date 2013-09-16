'use strict';

var MainCtrl;

MainCtrl = (function() {

  function MainCtrl() {
    Application.Controllers.controller("MainCtrl", [
      "$scope", function($scope) {
        return $scope.foo = "booyah";
      }
    ]);
  }

  return MainCtrl;

})();

window.MainCtrl = new MainCtrl();