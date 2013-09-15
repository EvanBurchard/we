/**
 * MessagesController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  chat: function (req, res) {
    if (req.session.user) {
        res.view({username: req.session.user.username});
    } else {
        res.redirect('/');
    }
  }

};
