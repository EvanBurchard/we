/**
 * FilesController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling files upload .
 */

module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */
  index : function (req, res, next){
    res.send(
      {"files":[]}
    );
  },

  /* Upload one file to server
  */
  upload: function (req, res, next) {
    console.log('no file upload',req);

    next();
  },

};

