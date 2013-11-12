/**
 * ActivityController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req,res) {
    console.log('index activity',req.headers);
    var format = 'html';
    if(req['headers']['accept'] == 'application/json'){
      format = 'json';
    }

    Activity.find({})
      .limit(10)
      .sort('updatedAt DESC')
      .done(function(err, activities) {
      // Error handling
      if (err) {
        return console.log(err);
        // TODO
      // Found multiple users!
      } else {
        if(req.isSocket || format == 'json'){
          return res.send(
           activities
          );
        }else{
          return res.view(
            'home/index.ejs',
            {
              activities: activities
            }
          );
        }
      }
    });

    //res.view('home/index.ejs');
  },

  create : function (req, res, next){
    console.log('create activity');
    var activity = {};
    activity.text = req.param("text");
    activity.creator_id = req.user.id;

    Activity.create(activity).done(function(error, newActivity) {
      if (error) {
        console.log(error);
        res.send(500, {error: res.i18n("DB Error") });
      } else {
        console.log('newActivity',newActivity);

        res.send({
          'activity': newActivity
        });

      }
    });
  }

};
