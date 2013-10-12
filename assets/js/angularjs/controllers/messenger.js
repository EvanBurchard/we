"use strict";

angular.module("application").controller("MessengerCtrl", [
  "$rootScope","$scope", "$location", "SessionService", function($rootScope, $scope, $location, SessionService) {
    var init;

    init = function() {
      $scope.templates = [ { name: 'contact-list.html', url: 'templates/.ejs'} ];
      $scope.template = $scope.templates[0];
      $scope.contacts = [
        {
          id: 1,
          name: 'Maria'
        },
        {
          id: 2,
          name: 'Joana'
        }
      ];

      $scope.inComunication = [
        {
          id: 1,
          name: 'Maria',
          messages: [{
            id : 1,
            content : 'oi mundo'
          }]
        },
        {
          id: 2,
          name: 'Santos',
          messages: [
          {
            id : 10,
            content : 'Oi,'
          },
          {
            id : 11,
            content : 'Tudo bem?'
          },
          ],
        }
      ];

      return $scope.user = {};
    };

    return init();
  }
]);
