/*---------------------
  :: Template
  -> controller
---------------------*/

var fs = require('fs');

module.exports = {
  index: function (req,res) {
    var listOfAssetSourcePaths = sails.config.assets.sequence;

    var htmlString = "";
    async.each(listOfAssetSourcePaths, function (path,cb) {
      require('fs').readFile(path,function (err, contents) {
        if (err) return cb(err);
        htmlString += contents;
      });
    }, function (err) {
      if (err) return res.send(err,500);
      res.contentType('text/html');
      res.send(htmlString);
    });
  },

  find: function(req,res) {
    var tpl = req.param('id');
    console.log('looking for template ' + tpl);
    fs.readFile( process.cwd() + '/assets/templates/views/remote/'+tpl,function (err, contents) {
      if (err){
        console.log(err);
        res.contentType('text/html');
        res.send('');
      }
      else {
        res.contentType('text/html');
        res.send(contents);
      }
    });
  }
};

