"use strict";

angular.module("application")
.controller("ActivityController", [
  "$rootScope","$scope", "SessionService", 'ActivityResource', 'activitiesData',  '$route', '$routeParams',
  function($rootScope, $scope, SessionService, ActivityResource, activitiesData,  $route, $routeParams) {
    var init;
    var show;
    var ActivityController;

    ActivityController = function(){

      ActivityController.prototype.show = function($scope) {
        console.log("" + $rootScope.action + " action called");
        if ($routeParams.id) {
          return $scope.user = ActivityResource.get({
            id: $routeParams.id
          }, function(success) {
            return console.log(success);
          }, function(error) {
            return console.log(error);
          });
        }
      };

    }

    init = function (){
      console.log(activitiesData);
      $scope.sharebox = {};
      $scope.sharebox.open = false;
      $scope.activities = activitiesData;
    }

    show = function ($scope, $routeParams){
      console.log('no show');
      console.log('$routeParams', $routeParams);
    }

    $scope.up = function() {
      return console.log('up');
    };

    $scope.down = function() {
      return console.log('down');
    };

    $scope.share = function() {
      return console.log('share');
    };

    $scope.edit = function(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log($scope);
      return console.log('edit');
    };

    $scope["delete"] = function(index, event) {
      event.preventDefault();
      event.stopPropagation();
      console.log('delete');
      console.log(new ActivityResource({
        'activity': $scope.activities[index]
      }));
      if (confirm('Permanently delete this post?')) {
        console.log($scope.activities[index]);
        $scope.activities[index].$delete();
        return $scope.activities.splice(index, 1);
      }
    };

    $scope.submit = function(event, activity) {
      event.preventDefault();
      event.stopPropagation();

      var Activity;

      Activity = new ActivityResource({
        'text': activity.content
      });

      Activity.$save(function(data, headers) {

        console.log('Activity.$save', data);
        if(data.activity){
          $scope.activities.unshift(data.activity);
        }

        $scope.closeSharebox();
        jQuery('.sharebox textarea').val('');

      }, function(err, headers) {
        // error here
        // TODO
        console.error('error: ',err);
      });

    };

    $scope.closeSharebox = function(){
      $scope.sharebox.open = false;
    }

    $scope.openSharebox = function(){
      $scope.sharebox.open = true;
    }

    init();

    return window.ActivityController = new ActivityController();
  }

]);