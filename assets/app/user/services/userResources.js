(function() {

  define([
    'angular',
    'modules',
    'user/services/session',
    'messenger/services/messenger',
    '$socket',

  ], function (
    angular,
    module,
    sessionService,
    messengerService,
    $socket
  ) {

    "use strict";

    return angular.module("application.user")
    .service("userService", ["$resource"])
    .factory("userResource", [
      "$resource",
      function ($resource) {
      // We need to add an update method
      return $resource(
         "/users/:id", {
            id: "@id"
          }, {
            update: {
              method: 'PUT'
            }
          }
      );
    }])
    .factory('userResolver',[
      '$http', '$q', 'userResource',
      function($http,$q, userResource){
        return function () {
          var deferred = $q.defer();

          var users;
          users = userResource.query(function() {
            return deferred.resolve(users);
          }, function(error) {
            console.log('error on get users', error);
            return deferred.reject(error);
          });

          return deferred.promise;
        };
      }])
      .factory('userShowResolver',[
        '$rootScope',
        '$http',
        '$q',
        'ActivityResource',
      function($rootScope, $http,$q, ActivityResource){
        return function ($stateParams) {
          var deferred = $q.defer();

          // get from cache
          if($rootScope.activities && $rootScope.activities[$stateParams.id]){
            return $rootScope.activities[$stateParams.id];
          }else{
            ActivityResource.get({
              id: $stateParams.id
            }, function(activitie, getResponseHeaders){
              return deferred.resolve(activitie);
            }, function(error) {
              return deferred.reject(error);
            });
          }

          return deferred.promise;
        };
    }]);
  });
}());