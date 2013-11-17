"use strict";

angular.module('application.services')
.service("userService", ["$resource"])
.factory("User", [
  "$resource",
  function ($resource) {
  // We need to add an update method
  return $resource(
     "/user/:id", {id: "@id" }, {
        update: { method: 'PUT'}
      }
  );

  // return $resource(
  //    "/user/:id", { id: "@id" }, {
  //       index: { method: 'GET', isArray: true },
  //       new: { method: 'GET' },
  //       create: { method: 'POST' },
  //       show: { method: 'GET' },
  //       edit: { method: 'GET' },
  //       update: { method: 'PUT' },
  //       destroy: { method: 'DELETE' }
  //     }
  // );

}]);