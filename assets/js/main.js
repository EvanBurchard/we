require.config({
  paths: {
      //'jquery' : 'jquery.min',
      'bootstrap' : 'bootstrap.min',

      'io' : 'socket.io',
      'sails.io' : 'sails.io',

      // angular.js
      'angular' : 'angular.min',
      'ngResource': 'angular-resource.min',
      'ngCookies': 'angular-cookies.min',
      'uiRouter' : 'angularjs/libs/angular-ui-router',
      'uiBootstrap' : 'angularjs/libs/ui-bootstrap',

      'pascalprechtTranslate' : 'angularjs/libs/angular-translate.min',

      'wuMasonry' :'angularjs/libs/angular-masonry.min',

     // 'jquery.fileupload-angular' : 'jquery.fileupload-angular',

      'modules' : 'angularjs/modules',
      'SessionService' : 'angularjs/services/session',
      '$socket' : 'angularjs/services/socket',
      'UserService': 'angularjs/services/users',
      'MessengerService': 'angularjs/services/messengerService'

  },
  shim: {
      'ngResource': {
        deps: ['angular'],
        exports: 'angular'
      },
      'ngCookies': {
        deps: ['angular'],
        exports: 'angular'
      },
      'angular': {
        exports : 'angular'
      },
      'pascalprechtTranslate':{
        deps: ['angular']
      },
      'uiRouter':{
        deps: ['angular']
      },
      'uiBootstrap':{
        deps: ['angular']
      },
      'wuMasonry':{
        deps: ['angular']
      },

      'jquery': {
        exports : 'jquery'
      },

      'bootstrap': {
        deps: ['jquery']
      },

      'jquery.ui.widget':{
        deps: ['jquery'],
        exports : 'jquery'
      },
/*
      // file upload
      'jquery.fileupload-angular':{
        deps: ['angular','jquery', 'load-image', 'jquery.fileupload', 'jquery.fileupload-process']
      },

      'jquery.fileupload' : {
        deps: ['jquery','bootstrap','jquery.ui.widget', 'load-image' ,'jquery.iframe-transport'],
        exports : 'jquery'
      },

      'jquery.fileupload-process' : {
        deps: ['jquery', 'jquery.ui.widget', 'jquery.fileupload'],
        exports : 'jquery'
      },
      */

  },
  baseUrl: '/js'
});

require([
  'angular',
  'angularjs/application',

  ], function (angular,app) {
  app.init();
});