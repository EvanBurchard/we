/**
 * UsersController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req, res) {
    Users.find({})
    .limit(10)
    .sort('name ASC')
    .done(function(err, users) {

      // Error handling
      if (err) {
        return console.log(err);

      // Found multiple users!
      } else {
        console.log("Users found:", users);
        return res.view({
          users: users
        });
      }
    });

  },

  signup: function (req, res) {
    res.view();
  },

  login: function (req, res, next) {
      var email = req.param("email");
      var password = req.param("password");

      Users.findOneByEmail(email).done(function(err, usr) {

          if (err) {
              res.send(500, { error: res.i18n("DB Error") });
          } else {
              if (usr) {
                  var hasher = require("password-hash");
                  if (hasher.verify(password, usr.password)) {
                      passport.authenticate('local', function(err, usr, info) {
                        if (err) return next(err)
                        if (!usr) return res.redirect('/login')
                        req.logIn(usr, function(err){
                          if(err) return next(err)
                          return res.redirect('/')
                        })
                      })(req, res, next)
                      res.send(usr);
                  } else {
                      res.send(400, { error: res.i18n("Wrong Password") });
                  }
              } else {
                  res.send(404, { error: res.i18n("User not Found") });
              }
          }
      });
  },

  create: function (req, res) {
    var user = {};
    user.name = req.param("name");
    user.email = req.param("email");
    user.password = req.param("password");
    user.password = req.param("confirmPassword");

    Users.findOneByEmail(user.email).done(function(err, usr){
      console.log(res);
        if (err) {
            res.send(500, { error: res.i18n("DB Error") });
        } else if ( usr ) {
            res.send(400, {error: res.i18n("Email already Taken")});
        } else {

            Users.create(user).done(function(error, newUser) {
            if (error) {
                res.send(500, {error: res.i18n("DB Error") });
            } else {
                req.session.user = newUser;
                res.send(newUser);
            }
        });
      }
    });
  },

  chat: function (req, res) {

  }

};
