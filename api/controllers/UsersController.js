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
              res.send(500, { error: "DB Error" });
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
                      res.send(400, { error: "Wrong Password" });
                  }
              } else {
                  res.send(404, { error: "User not Found" });
              }
          }
      });
  },

  create: function (req, res) {
     var username = req.param("username");
          var password = req.param("password");

          Users.findOneByUsername(username).done(function(err, usr){

              if (err) {
                  res.send(500, { error: "DB Error" });
              } else if ( usr ) {
                  res.send(400, {error: "Username already Taken"});
              } else {
                  var hasher = require("password-hash");
                  password = hasher.generate(password);

                  Users.create({username: username, password: password}).done(function(error, user) {
                  if (error) {
                      res.send(500, {error: "DB Error"});
                  } else {
                      req.session.user = user;
                      res.send(user);
                  }
              });
          }
      });
  },

  chat: function (req, res) {

  }

};
