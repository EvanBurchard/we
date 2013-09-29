/**
 * UsersController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var passport = require('passport');

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
                  if (usr.verifyPassword(password)) {
                      passport.authenticate('local', function(err, usr, info) {

                        if (err) return next(err);
                        if (!usr) return res.redirect('/login');

                        req.logIn(usr, function(err){
                          if(err) return next(err);

                          res.send(usr);
                        });

                      })(req, res, next)

                  } else {
                      res.send(400, { error: res.i18n("Wrong Password") });
                  }
              } else {
                  res.send(404, { error: res.i18n("User not Found") });
              }
          }
      });
  },

  logout: function (req, res) {
    req.logout();
    res.redirect('/');
  },

  create: function (req, res, next) {
    var user = {};
    user.name = req.param("name");
    user.email = req.param("email");
    user.password = req.param("password");
    user.password = req.param("confirmPassword");

    Users.findOneByEmail(user.email).done(function(err, usr){
      if (err) {
          res.send(500, { error: res.i18n("DB Error") });
      } else if ( usr ) {
          res.send(400, {error: res.i18n("Email already Taken")});
      } else {
          Users.create(user).done(function(error, newUser) {
            if (error) {
                res.send(500, {error: res.i18n("DB Error") });
            } else {
              console.log(next);

              req.logIn(newUser, function(err){
                if(err) return next(err);

                res.send(newUser);
              });

            }
        });
      }
    });
  },

  chat: function (req, res) {

  }

};
