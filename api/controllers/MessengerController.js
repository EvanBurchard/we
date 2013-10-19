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
    message.content = req.param("content");
    message.fromId = req.param("fromId");
    message.toId = req.param("toId");

    Messages.create(message).done(function (error, newMessage){
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {

        if(req.isSocket){
          sails.io.sockets.in('user_' + newMessage.toId[0]).emit(
            'receive:message',
            {
              message: newMessage
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

  start: function (req, res, next){
    var friendList = {};
    // publish as online
    //console.log(sails.onlineusers);

    // get online users list
    if(sails.onlineusers){
      Object.keys(sails.onlineusers).forEach(function(element, key) {
        // element is the name of the key.
        // key is just a numerical value for the array
        console.log(element);
        console.log(key);

      });
    }

    res.send(
      {
        friendList: sails.onlineusers
      });

  }


};
