'use strict'

Application.Services.service("messengerService",
  ["$resource"]).factory("MessengerService", function ($resource) {
  // We need to add an update method
  return $resource("/messenger/:id", { }, {
      'start': {
        method: 'GET',
        url: '/messenger/start'
      }
    }
  );

  // return $resource(
  //    "/messenger/:id", { id: "@id" }, {
  //       index: { method: 'GET', isArray: true },
  //       new: { method: 'GET' },
  //       create: { method: 'POST' },
  //       show: { method: 'GET' },
  //       edit: { method: 'GET' },
  //       update: { method: 'PUT' },
  //       destroy: { method: 'DELETE' }
  //     }
  // );

});