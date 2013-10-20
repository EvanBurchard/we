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

      $scope.contacts = {};

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
          angular.forEach(data.friendList, function(contact, key){

            // set default values for every contact
            if(!contact.messages){
              contact.messages = [];
            }
            if(!contact.messengerBox){
              contact.messengerBox = {};
            }

            $scope.contacts[contact.id] = contact;

          });


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

    $scope.send = function (newMessage, toId, event){
      event.preventDefault();
      event.stopPropagation();

      var user = SessionService.getUser();
      var newMessageObj = {};

      newMessageObj.content = newMessage;
      newMessageObj.toId = [ toId ];
      newMessageObj.fromId = user.id;
      newMessageObj.status = 'sending';

      $scope.contacts[toId].messages.push(newMessageObj);
      $scope.contacts[toId].newMessage = '';

      $socket.post(
        '/users/'+toId+'/messenger',
        newMessageObj ,
        function (response) {
          console.log(response);
      });
    }

    // Socket IO

    /**
     * Receive a messenger message
     * @param  Object data
     */
    $socket.on("receive:message", function(data) {
        var newMessageObj = {};

        newMessageObj.content = newMessage;
        newMessageObj.toId = [ toId ];
        newMessageObj.fromId = user.id;
        newMessageObj.status = 'sending';

        $scope.contacts[data.message.fromId].messages.push(data.message);
        $scope.$apply();
    });

    /**
     * Message receveid after a contact disconect
     * @param  object data
     */
    $socket.on("contact:connect", function(data) {
      var user = SessionService.getUser();
      var contact = data.contact;

      if(user.id != contact.id){
        // set default values for every contact
        if(!contact.messages){
          contact.messages = [];
        }
        if(!contact.messengerBox){
          contact.messengerBox = {};
        }

        $scope.contacts[contact.id] = contact;
        //$scope.contacts[data.contact.id] = ;
        $scope.$apply();
      }
    });

    /**
     * Message receveid after a contact disconect
     * @param  object data
     */
    $socket.on("contact:disconnect", function(data) {
        delete $scope.contacts[data.contact.id];
        $scope.$apply();
    });

    return init();
  }
]);
