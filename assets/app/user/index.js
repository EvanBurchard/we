// Load module files
(function() {

  var moduleFiles = [
    'modules',
    './services/session',
    './services/user',
    './controllers/login',
    './controllers/create-account'
  ];

  define( moduleFiles, function() {} );

}());