/**
 * UsersController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

var passport = require('passport');

module.exports = {

  index: function (req, res) {

    var format = 'html';
    if(req.param('format')){
      format = req.param('format');
    }

    Users.find({})
    .limit(10)
    .sort('name ASC')
    .done(function(err, users) {

      // Error handling
      if (err) {
        return console.log(err);

      // Found multiple users!
      } else {
        if(format == 'json')
          return res.send({
            users: users
          });

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

  // Signup function
  create: function (req, res, next) {
    var user = {};
    user.name = req.param("name");
    user.email = req.param("email");
    user.password = req.param("password");

    var confirmPassword = req.param("confirmPassword");
    var errors;

    if( errors = validSignup(user, confirmPassword) ){
      // error on data or confirm password
      res.send({
        errors: errors
      });
    } else {

      Users.findOneByEmail(user.email).done(function(err, usr){
        if (err) {
            res.send(500, { error: res.i18n("DB Error") });
        } else if ( usr ) {
            res.send(400, {error: res.i18n("Email already Taken")});
        } else {
            Users.create(user).done(function(error, newUser) {
              if (error) {
                console.log(error);
                res.send(500, {error: res.i18n("DB Error") });
              } else {
                req.logIn(newUser, function(err){
                  if(err) return next(err);

                  res.send({
                    user: newUser
                  });
                });

              }
          });
        }
      });
    }
  },

  // getter for current logged in user
  current: function (req, res, next) {
    if(req.isAuthenticated()){

      // TODO change to join after waterline join suport is ready to use
      // if has a avatar get it after send
      if(req.user.avatarId  && !req.user.avatar){
        Images.findOneById(req.user.avatarId).done(function(err, image) {
          req.user.avatar = image;
          respond();
        });
      }else{
        respond();
      }


    }else{
      res.send({user: {}});
    }

    function respond(){
      res.send({user: req.user});
    }
  },


  changeAvatar: function (req, res, next) {
    // TODO validate req.files.files
    var  avatarFile = req.files.files[0];

    Images.upload(avatarFile, function(err){
      if(err){
        res.send(
          {
            "files":[],
            "error": err
          }
        );
      } else {
        saveImage();
      }

    });

    function saveImage(){

      var uploadedFile = {};

      uploadedFile.name = avatarFile.newName;
      uploadedFile.originalFilename = avatarFile.originalFilename;
      uploadedFile.size = avatarFile.size;
      uploadedFile.extension = avatarFile.extension;

      // TODO check if are better get mime direct from file
      //uploadedFile.mime = req.files.files.headers['content-type'];
      uploadedFile.user_id = req.user.id;

      Images.create(uploadedFile).done(function(error, salvedFile) {
        if (error) {
          // TODO delete file if ocurs errror here
          console.log(error);
          res.send(500, {error: res.i18n("DB Error") });
        } else {
          //console.log('salved File:',salvedFile);
          salvedFile.thumbnailUrl = 'http://localhost:1333/images/avatars/user-avatar.png';
          salvedFile.url = 'http://localhost:1333/images/avatars/user-avatar.png';
          salvedFile.deleteUrl = '/files/' + salvedFile.id;
          salvedFile.deleteType = 'DELETE';
          console.log(salvedFile);
          saveAvatar(salvedFile);

        }
      });
    }

    function saveAvatar(salvedFile){
      // Lookup a user
      console.log('on user',req.user);
      req.user.avatarId = salvedFile.id;
      req.user.save( function(err) {
        if(err){
          return res.send(500, {err: res.i18n("Error on user avatar save") });
        }

        res.send({
          "user": req.user,
          "avatar": salvedFile
        });
      });
    }
  }
};

var validSignup = function(user, confirmPassword){
  var errors = [];

  if(!user.email){
    errors.push("Field <strong>email</strong> is required");
  }

  if(user.password){
    errors.push("Field <strong>password</strong> is required");
  }

  if(!confirmPassword){
    errors.push("Field <strong>Confirm new password</strong> is required");
  }

  if(confirmPassword != user.password){
    errors.push("<strong>New password</strong> and <strong>Confirm new password</strong> are different");
  }

  return errors;
}
