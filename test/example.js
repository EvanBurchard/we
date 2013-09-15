/**
 * Test Instance/Class Methods on an Account Model
 */

var assert = require('assert'),
    Utils = require('utils'),
    Database = require('database');

describe('Account', function() {

  describe('.destroy()', function() {
    var account,
        directories = {},
        files = {};

    before(function(done) {

      // Clean database before tests
      Database.deleteData(['account', 'directory', 'directorypermission', 'file', 'filePermission'],
      function() {

        // Create an account
        Utils.createAccount({}, function(err, accountModel) {
          if(err) return done(err);
          account = accountModel;

          // Create A Workgroup & Permissions
          Utils.createDirectory('dir-a', { OwnerId: account.id }, function(err, dir) {
            if(err) return done(err);
            directories.A = dir;

            // Create a Child Directory
            Utils.createDirectory('dir-b', { DirectoryId: dir.id }, function(err, childDir) {
              if(err) return done(err);
              directories.B = childDir;

              // Create a File & Permissions
              Utils.createFile({ name: 'file-a', dirId: childDir.id }, function(err, fileObj) {
                if(err) return done(err);
                files.A = fileObj;

                done();
              });
            });
          });
        });
      });
    });

// ........
// ........
// ........
// ........
  });
});