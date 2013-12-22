require.config({
  paths: {
      'jquery' : '../bower_components/jquery/jquery.min',
      //'jquery-bridget' : '../bower_components/jquery-bridget/jquery.bridget',
      'bootstrap' : '/js/libs/bootstrap.min',
      'imagesloaded': '/js/libs/imagesloaded.min',


      'eventie': '../bower_components/eventie',
      //'doc-ready': '../bower_components/doc-ready',
      'eventEmitter': '../bower_components/eventEmitter',
      'get-style-property': '../bower_components/get-style-property',
      'get-size': '../bower_components/get-size',
      'matches-selector': '../bower_components/matches-selector',
      'outlayer': '../bower_components/outlayer',

      //'masonry': '/js/libs/masonry.pkgd.min',

      'domReady': '/js/libs/requirejs/domReady',

      'io' : '/js/socket.io',
      'sails.io' : '/js/sails.io',
      'app' : '/js/app',
      // angular.js
      'angular' : '../bower_components/angular/angular.min',
      'angular-route' : '../bower_components/angular-route/angular-route.min',
      'ngResource': '/js/libs/angularjs/angular-resource.min',
      'ngCookies': '/js/libs/angularjs/angular-cookies.min',

      'uiBootstrap': '/js/libs/ui-bootstrap',
      'uiRouter': '/js/libs/angularjs/angular-ui-router',
      'wuMasonry': '/js/libs/angularjs/angular-masonry',

      'modules' : 'modules',
      '$socket' : 'site/services/socket'

  },
  shim: {
      'ngResource': {
        deps: ['angular']
      },
      'ngCookies': {
        deps: ['angular']
      },
      'angular': {
        exports : 'angular'
      },

      'uiRouter': {
        deps: ['angular']
      },

      'uiBootstrap': {
        deps: ['bootstrap', 'angular']
      },
      /*
      'wuMasonry': {
        deps: ['jquery', 'angular', 'masonry','imagesloaded']
      },
      */
      'jquery': {
        exports : 'jQuery'
      },

      'imagesloaded': {
        deps : ['jquery']
      },
      /*
      'masonry': {
        deps: ['jquery', 'imagesloaded']
      },
      */

      'bootstrap': {
        deps: ['jquery']
      },

      'app': {
        deps: ['io', 'sails.io']
      },

  },
  baseUrl: '/app',
  deps: [
      // kick start application... see bootstrap.js
      './starter'
  ]

});
