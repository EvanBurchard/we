"use strict";

angular.module("application").controller("MessengerCtrl", [
  "$rootScope","$scope","$socket", "$location", "SessionService",
   function($rootScope, $scope,$socket, $location, SessionService) {
    var init;

    init = function() {

      console.log($rootScope);
      $scope.templates = [
        {
          name: 'contact-list.html',
          url: '/templates/contact-list.html'
        },
        {
          name: 'messenger-box.html',
          url: '/templates/messenger-box.html'
        }
      ];
      $scope.template = $scope.templates[1];
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

      $scope.contactsOpen = [
        {
          id: '5242db50a0c3551146000001',
          name: 'Alberto',
          newMessage: '',
          messages: [{
            id : 1,
            content : 'oi mundo'
          }]
        },
        {
          id: '5242daec77789ecb45000001',
          name: 'Santos',
          newMessage: '',
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

    $scope.send = function (newMessage, toId){
      var user = SessionService.getUser();
      console.log(newMessage);
      $socket.post(
        '/users/'+toId+'/messenger',
        {
          fromId: user.id,
          message: newMessage,
          toId: [
            toId
          ]

        },
        function (response) {
          console.log(response);
      });
    }

    return init();
  }
]);
