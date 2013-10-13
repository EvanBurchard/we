/**
 * Bootstrap
 *
 * An asynchronous boostrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#documentation
 */

module.exports.bootstrap = function (cb) {

  sails.io.on('connection', function(socket) {

    var userId = socket.handshake.session.passport.user;

    // join user exclusive room to allow others users send
    // mesages to this user
    Users.subscribe(socket , [userId] );
    socket.join('user_' + userId);

    socket.on('disconnect', function () {
        console.log('Disconect!!! ');
/*
        sails.io.sockets.emit('message', {
            status: 'disconected',
            handshake: socket.handshake
        });
*/
    });
  });
  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};