require.config({
  paths: {
    jquery: '../bower_components/jquery/jquery',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    imagesloaded: '/js/libs/imagesloaded.min',
    eventie: '../bower_components/eventie/eventie',
    eventEmitter: '../bower_components/eventEmitter/EventEmitter',
    'get-style-property': '../bower_components/get-style-property/get-style-property',
    'get-size': '../bower_components/get-size/get-size',
    'matches-selector': '../bower_components/matches-selector/matches-selector',
    outlayer: '../bower_components/outlayer/outlayer',
    domReady: '/js/libs/requirejs/domReady',
    io: '/js/socket.io',
    'sails.io': '/js/sails.io',
    app: '/js/app',
    angular: '../bower_components/angular/angular',
    'angular-route': '../bower_components/angular-route/angular-route',
    ngResource: '../bower_components/angular-resource/angular-resource.min',
    ngCookies: '../bower_components/angular-cookies/angular-cookies.min',
    uiBootstrap: '/js/libs/ui-bootstrap',
    uiRouter: '../bower_components/angular-ui-router/release/angular-ui-router.min',
    wuMasonry: '../bower_components/angular-masonry/angular-masonry',
    modules: 'modules',
    '$socket': 'site/services/socket',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angular-resource': '../bower_components/angular-resource/angular-resource',
    'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router',
    'canvas-to-blob': '../bower_components/blueimp-canvas-to-blob/js/canvas-to-blob',
    'jquery.postmessage-transport': '../bower_components/blueimp-file-upload/js/cors/jquery.postmessage-transport',
    'jquery.xdr-transport': '../bower_components/blueimp-file-upload/js/cors/jquery.xdr-transport',
    'jquery.ui.widget': '../bower_components/blueimp-file-upload/js/vendor/jquery.ui.widget',
    'jquery.fileupload': '../bower_components/blueimp-file-upload/js/jquery.fileupload',
    'jquery.fileupload-process': '../bower_components/blueimp-file-upload/js/jquery.fileupload-process',
    'jquery.fileupload-validate': '../bower_components/blueimp-file-upload/js/jquery.fileupload-validate',
    'jquery.fileupload-image': '../bower_components/blueimp-file-upload/js/jquery.fileupload-image',
    'jquery.fileupload-audio': '../bower_components/blueimp-file-upload/js/jquery.fileupload-audio',
    'jquery.fileupload-video': '../bower_components/blueimp-file-upload/js/jquery.fileupload-video',
    'jquery.fileupload-ui': '../bower_components/blueimp-file-upload/js/jquery.fileupload-ui',
    'jquery.fileupload-jquery-ui': '../bower_components/blueimp-file-upload/js/jquery.fileupload-jquery-ui',
    'jquery.fileupload-angular': '../bower_components/blueimp-file-upload/js/jquery.fileupload-angular',
    'jquery.iframe-transport': '../bower_components/blueimp-file-upload/js/jquery.iframe-transport',
    'load-image': '../bower_components/blueimp-load-image/js/load-image',
    'load-image-ios': '../bower_components/blueimp-load-image/js/load-image-ios',
    'load-image-orientation': '../bower_components/blueimp-load-image/js/load-image-orientation',
    'load-image-meta': '../bower_components/blueimp-load-image/js/load-image-meta',
    'load-image-exif': '../bower_components/blueimp-load-image/js/load-image-exif',
    'load-image-exif-map': '../bower_components/blueimp-load-image/js/load-image-exif-map',
    'blueimp-tmpl': '../bower_components/blueimp-tmpl/js/tmpl',
    'doc-ready': '../bower_components/doc-ready/doc-ready',
    'jquery-bridget': '../bower_components/jquery-bridget/jquery.bridget',
    masonry: '../bower_components/masonry/masonry',
    item: '../bower_components/outlayer/item',
    'ng-table': '../bower_components/ng-table/ng-table'
  },
  shim: {
    ngResource: {
      deps: [
        'angular'
      ]
    },
    ngCookies: {
      deps: [
        'angular'
      ]
    },
    angular: {
      exports: 'angular'
    },
    uiRouter: {
      deps: [
        'angular'
      ]
    },
    uiBootstrap: {
      deps: [
        'bootstrap',
        'angular'
      ]
    },
    'ng-table': {
      deps: [
        'angular'
      ]
    },
    'angular-route': {
      deps: [
        'angular'
      ]
    },
    imagesloaded: {
      deps: [
        'jquery'
      ]
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    app: {
      deps: [
        'io',
        'sails.io'
      ]
    }
  },
  baseUrl: '/app',
  deps: [
    './starter'
  ]
});
