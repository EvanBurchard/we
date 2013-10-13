/**
 * MessengerController
 *
 * @TODO change the name to MesengerController.js
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {

    var format = 'json';
    if(req.param('format')){
      format = req.param('format');
    }

    Messages.find({})
    .limit(10)
    .sort('createdAt ASC')
    .done(function(err, messages) {

      // Error handling
      if (err) {
        return console.log(err);
      }
      // Found multiple messages!
      if (messages) {

        if(format == 'json'){
          res.json({
            messages: messages
          });
        } else {
          res.view({
            messages: messages
          });
        }
      }
    });
  },


  // add message
  create: function (req, res, next) {
    var message = {};
    message.message = req.param("message");
    message.fromId = req.param("fromId");
    message.toId = req.param("toId");

    Messages.create(message).done(function (error, newMessage){
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {

        if(req.isSocket){
          sails.io.sockets.in('user_' + newMessage.toId[0]).emit(
            'message',
            {
              message: newMessage,
              id: newMessage.id,
              createdAt: newMessage.createdAt
            }
          );
        } else {
          res.send({
            message: newMessage
          });
        }

      }
    });
  },

  test: function (req,res){
    if(req.isSocket){
      /*
      Messages.subscribe( req.socket );
      var data = 'oi mundo';
      console.log(req.socket.uid);
      console.log(sails.io.sockets);
//    res.socket.emit("message",req.socket.uid,data+req.socket.uid);
      req.socket(req.socket.id).emit("message",req.socket.uid,data+req.socket.uid);
    */
    }

  },

  test2: function (req,res){

  },

};
