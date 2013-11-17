"use strict";

angular.module("application").controller("AvatarModalController", [
  "$rootScope","$scope", "$modal",
  function($rootScope, $scope, $modal) {

    $scope.openModal = function () {
      var modalInstance = $modal.open({
        templateUrl: '/templates/change-avatar-form.html',
        controller: 'AvatarController',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        console.info('Modal dismissed at: ' + new Date());
      });
    };
  }

]);

angular.module("application").controller("AvatarController", [
  "$rootScope","$scope", '$window', "$location", "SessionService", "$modal", "$modalInstance",
  function($rootScope, $scope, $window, $location, SessionService, $modal, $modalInstance) {

    $scope.modalClose = function (){
      $modalInstance.close();
    }

    // Options you want to pass to jQuery File Upload e.g.:
    $scope.options = {
        maxFileSize: 5000000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        headers: {
          "X-CSRF-Token": $('meta[name=csrf-token]').attr('content')
        }
    };
    $scope.$on('fileuploadsend', function(event, data){
        console.log('event',event);
        console.log('data',data);
        data['data']['_csrf'] = $('meta[name=csrf-token]').attr('content');
        //var token = $('meta[name="csrf-token"]').attr('content');
        console.log('xhr', data.xhr);
        //if (token) data.xhr.setRequestHeader('X-CSRF-Token', token);
    });

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

