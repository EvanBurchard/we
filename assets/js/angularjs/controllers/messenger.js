"use strict";

angular.module("application").controller("MessengerCtrl", [
  "$rootScope","$scope","$socket", "$location", "SessionService", "MessengerService",
   function($rootScope, $scope,$socket, $location, SessionService, MessengerService) {
    var init;
    var startMessenger;

    init = function() {
      $scope.contacts = {};
      $scope.contactsOpen = [];
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
          id: '5242db50a0c3551146000001',
          name: 'Alberto'
        },
        {
          id: '5242daec77789ecb45000001',
          name: 'Santos'
        }
      ];
      /*
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
            fromId: '',
            toId: [
              ''
            ],
            message : 'Oi,'
          },
          {
            id : 10,
            fromId: '',
            toId: [
              ''
            ],
            message : 'Tudo bem?'
          },
          ],
        }
      ];
      */
      startMessenger($scope);
      return $scope.user = {};
    };

    /**
     * Get messenger data and start
     * @return {[type]} [description]
     */
    startMessenger = function ($scope){
      MessengerService.start(
        //success
        function(data) {
          console.log(data);
          angular.forEach(data.friendList, function(contact, key){

            // set default values for every contact
            if(!contact.messages){
              contact.messages = [
                {
                  id : '5262eb1ce68a805b52000001',
                  fromId: '"5242db50a0c3551146000001"',
                  toId: [
                    '5242daec77789ecb45000001'
                  ],
                  content: 'Oi,'
                },
                {
                  id : 10,
                  fromId: '',
                  toId: [
                    ''
                  ],
                  content: 'Tudo bem?'
                },
              ];
            }
            if(!contact.messengerBox)
              contact.messengerBox = {};

            });
          $scope.contacts = data.friendList
        },
        // error
        function(data) {
          console.log('Error on startMessegner', data);
        }
      );
      /*
      $socket.get('/messenger/start', function (response) {
        console.log(response);
        console.log('starting messenger socket io');

      });
*/
    }

    $scope.startTalk = function (contactId){
      $scope.contacts[contactId].messengerBox.show = true;
      $scope.contacts[contactId].messengerBox.opened = true;
    }

    $scope.messengerBoxClose = function(contactId) {
      $scope.contacts[contactId].messengerBox.show = false;
    }

    $scope.messengerBoxToggle = function(contactId) {
      if($scope.contacts[contactId].messengerBox.opened){
        $scope.contacts[contactId].messengerBox.opened = false;
      }else{
        $scope.contacts[contactId].messengerBox.opened = true;
      }
    }

    $scope.send = function (newMessage, toId){
      var user = SessionService.getUser();
      var newMessageObj = {};
      console.log(newMessage);

      newMessageObj.content = newMessage;
      newMessageObj.toId = [ toId ];
      newMessageObj.fromId = user.id;
      newMessageObj.status = 'sending';

      $scope.contacts[toId].messages.push(newMessageObj);

      console.log($scope.contacts[toId]);
      $socket.post(
        '/users/'+toId+'/messenger',
        newMessageObj ,
        function (response) {
          console.log(response);
      });
    }

    // Socket IO
    $socket.on("receive:message", function(data) {
        console.log( $scope );
        console.log( data.message );
        $scope.contacts[data.message.fromId].messages.push(data.message);
        $scope.$apply();
    });

    return init();
  }
]);
