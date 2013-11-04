/**
 * ActivityController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {
    res.view('home/index.ejs');
  },

  create : function (req, res, next){

    var activity = {};
    activity.text = req.param("text");
    activity.creator_id = req.user.id;

    Activity.create(activity).done(function(error, newActivity) {
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {
        res.send({
          activity: newActivity
        });
      }
    });
  }

};
