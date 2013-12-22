// Load module files
(function() {

  var moduleFiles = [
    'modules',
    './resolvers/activity',
    './services/activityResource',
    './controllers/activity',
    './controllers/activityItem'
  ];

  define( moduleFiles, function() {} );

}());