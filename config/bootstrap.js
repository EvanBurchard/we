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
    console.log('connected');
    console.log(socket.store.id);
    console.log(socket.handshake);

    socket.on('disconnect', function () {
        console.log('DISCONNESSO!!! ');
        sails.io.sockets.emit('message', {
            number: '10'
        });
    });
  });
  // It's very important to trigger this callack method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};