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


};
