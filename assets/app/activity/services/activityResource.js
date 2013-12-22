'use strict';

angular.module('application.services')
  .factory('ActivityResource',[
    '$resource',
    function($resource){

    var ActivityResource;
    ActivityResource = $resource('/activity/:id', {
      id: '@id'
    }, {});
    return ActivityResource;
  }

]);
