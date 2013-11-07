"use strict";

angular.module("application").controller("ActivityController", [
  "$rootScope","$scope", "SessionService", 'ActivityResource',
  function($rootScope, $scope, SessionService, ActivityResource) {
    var init;

    init = function (){

    }


    $scope.submit = function(event) {
      event.preventDefault();
      event.stopPropagation();

      var Activity;
      Activity = new ActivityResource({
        'text': $scope.activity.content
      });

      return Activity.$save(function(data, headers) {

        jQuery('.sharebox .footer').hide();
        return jQuery('.sharebox textarea').val('');
      }, function(err, headers) {
        // error here

      });

    };
  }

]);