'use strict';

angular.module('application.services')
  .factory('activityResolver',['$http','$q', function($http,$q){
  return function () {
    var deferred = $q.defer();

    $http({ url: '/activity.json', method: "GET" }).then(function (data) {
        return $http({ url: '/activity.json', method: "GET" })
    }).then(function (data) {
        deferred.resolve(data);
    });
    return deferred.promise;

  }
}]);