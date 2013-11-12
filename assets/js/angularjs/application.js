"use strict";

/**
* The application file bootstraps the angular app by  initializing the main module and
* creating namespaces and moduled for controllers, filters, services, and directives.
*/

var Application = Application || {};

Application.Constants = angular.module('application.constants', []);
Application.Services = angular.module('application.services', []);
Application.Controllers = angular.module('application.controllers', []);
Application.Filters = angular.module('application.filters', []);
Application.Directives = angular.module('application.directives', []);

angular.module('application', [
  'ngResource', 'application.filters', 'application.services', 'application.directives',
  'application.constants', 'application.controllers', 'blueimp.fileupload',
  'pascalprecht.translate', 'wu.masonry'
  ]).
  config(['$routeProvider', '$locationProvider','$httpProvider',
    function($routeProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';


    $locationProvider.html5Mode(true).hashPrefix('#');

    $routeProvider.
      when('/', {
        templateUrl: '/templates/home.ejs'
      }).
      when('/user/forgot_password', {
        templateUrl: '/templates/forgotPasswordForm.html'
        //controller: 'LoginCtrl'
      }).
      when('/activity', {
        templateUrl: '/templates/activity/index.html',
        controller: 'ActivityController',
        resolve: {
            activitiesData: function(activityResolver){
                return activityResolver();
            }
        }
      }).
      when('/remotepartial', {
        templateUrl: '/templates/find/test.html'
      }).
      when('/login',{
        templateUrl: '/templates/login',
        controller: 'LoginCtrl'
      }).
      when('/users/logout',{
        controller: 'LoginCtrl',
        action: 'logoutHandler'
      }).
      when('/account',{
        templateUrl: '/templates/account.html',
        controller: 'LoginCtrl'
      }).
      when('/signup',{
        templateUrl: '/templates/signup.html',
        controller: 'LoginCtrl',

      }).
      when('/users', {
        templateUrl: '/templates/users/index.html',
        controller: 'UsersController.index',

      }).
      when('/users/new', {
        templateUrl: '/templates/users/new.html',
        controller: 'UsersController.new',
        action: 'new' // optional action for CRUD methods
      }).
      when('/users/show/:id', {
        templateUrl: '/templates/users/show.html',
        controller: 'UsersController.show',
        action: 'show' // optional action for CRUD methods
      }).
      when('/users/edit/:id', {
        templateUrl: '/templates/users/edit.html',
        controller: 'UsersController.edit',
        action: 'edit' // optional action for CRUD methods
      }).
      when('/users/delete/:id', {
        templateUrl: '/templates/users/index.html',
        controller: 'UsersController.delete',
        action: 'delete' // optional action for CRUD methods
      }).
      otherwise({
        templateUrl: '/templates/error404.html'
        // redirectTo: '/login'
      });

  }]).run(function($rootScope, $route, $http, $window){

    $rootScope.user = {};
    $rootScope.user.loading = true;

    $http({method: 'GET', url: '/users/current'}).
      success(function(data, status, headers, config) {
        $rootScope.user = data.user;
        $rootScope.user.loading = false;
      }).
      error(function(data, status, headers, config) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });

    // Bind the `$routeChangeSuccess` event on the rootScope, so that we dont need to bind in individual controllers.
    $rootScope.$on('$routeChangeSuccess', function(currentRoute, previousRoute) {
      // This will set the custom property that we have defined while configuring the routes.


      if($route.current.action == "logoutHandler"){
        return $window.location.href = "/users/logout";
      }

      if($route.current.action && $route.current.action.length > 0){
        $rootScope.action = $route.current.action;
      }
    });


});

