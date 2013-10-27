"use strict";

angular.module("application").controller("AvatarController", [
  "$rootScope","$scope", '$window', "$location", "SessionService",
  function($rootScope, $scope, $window, $location, SessionService) {
    // Options you want to pass to jQuery File Upload e.g.:
    $scope.options = {
        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
    };

    $scope.$on('fileuploaddone', function(event, data){
      // Your code here
      //console.log('event', event);
      console.log('data', data.result.avatar);
      $rootScope.user.avatarId = data.result.avatar.id;
      $rootScope.user.avatar = data.result.avatar;
      //console.log('filescope', files.scope());
      console.log('All uploads have finished',$scope);
    });

  }

]);

