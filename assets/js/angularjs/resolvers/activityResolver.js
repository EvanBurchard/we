'use strict';

angular.module('application.services')
  .factory('activityResolver',['$http','$q', 'ActivityResource',
  function($http,$q, ActivityResource){
    return function () {
      var deferred = $q.defer();
/*
      $http.get( '/activity' )
      .success(function(data){
          return deferred.resolve(data);
      }).error(function(data, status) {
          return deferred.reject(data);
      });
      ActivityResource.query(

      )
*/
      var activities;
      activities = ActivityResource.query(function() {
        return deferred.resolve(activities);
      }, function(error) {
        return deferred.reject(error);
      });

      return deferred.promise;
    }
}]);