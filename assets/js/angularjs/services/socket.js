'use strict';

Application.Services.factory("$socket", [
  "$rootScope", "User", function($rootScope, User) {
    var $socket;
    $socket = io.connect("http://localhost:1333");
    $socket.on("connect", function(stream) {
      console.log("someone connected!");

      $socket.on('connectedUsers', function(data) {
        console.log("connected users: ", data);
        return $rootScope.$apply(function() {
          return $rootScope.connectedUsers = data;
        });
      });

      $socket.on('userConnected', function(data) {
        console.log("user connected: ", data);
        return $rootScope.$apply(function() {
          return $rootScope.connectedUsers.push(data);
        });
      });

      $socket.on('news', function(data) {
        console.log(data);
        return $socket.emit('my other event', {
          my: 'data'
        });
      });

      $socket.on("onUserAdded", function(user) {
        var scope;
        scope = UsersController.getScope();
        user = User.get(user);
        console.log("onUserAdded called", user);
        return scope.users.push(user);
      });

      $socket.on("onUserUpdated", function(user) {
        var scope, users;
        scope = UsersController.getScope();
        console.log("onUserUpdated called", user);
        users = User.query();
        return scope.users = users;
      });

/*
      $socket.post('/messages',{message: 'sou foda'}, function (response) {
        console.log(response);
        console.log('post socket io');
        // create a new user
      });
*/
      $socket.get('/messages/init', function (response) {
        console.log(response);
        console.log('get socket io');
        // create a new user
      });

      /*
      $socket.post('/user',{name: 'foo'}, function (response) {
        // create a new user
      });
      $socket.put('/user/1',{name: 'foobar'}, function (response) {
        // update the user
      });
      $socket.delete('/user/1', function (response) {
        // delete the user
      });
*/
      return $socket.on("onUserDeleted", function(user) {
        var scope;
        scope = UsersController.getScope();
        console.log("onUserDeleted called", user);
        return scope.$apply(function() {
          return scope.users = $.grep(scope.users, function(o, i) {
            return o.id === user.id;
          }, true);
        });
      });
    });

    $socket.on("disconnect", function(stream) {
      return console.log("someone disconnected");
    });
    $socket.removeListener("connect");
    $socket.removeListener("news");
    $socket.removeListener("onUserAdded");
    return $socket.removeListener("onUserDeleted");
  }
]);

