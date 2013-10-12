/**
 * MessagesController
 *
 * @TODO change the name to MesengerController.js
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {


  index: function (req,res) {
    if(req.isSocket){
      //console.log(req);
      //console.log(res);
      req.socket.emit('news', 'hello');
      //console.log(req.listen());
      // console.log(Messages.subscribers());
      console.log(req.socket.store);

    }

   res.send({msg:'oi'});
  },

  init: function (req, res) {
    if(req.isSocket){
      //console.log(req);
      //
      console.log(req.session);
      req.socket.emit('userConnected', req.user);

      //console.log(req.listen());
      // console.log(Messages.subscribers());
      console.log(req.socket.store);

    }

   res.send({msg:'no init'});
  },

  chat: function (req, res) {
    if (req.session.user) {
        res.view({username: req.session.user.username});
    } else {
        res.redirect('/');
    }
  }

};
