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

angular.module('application', ['ngResource', 'application.filters', 'application.services', 'application.directives', 'application.constants', 'application.controllers']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    // $locationProvider.html5Mode(true).hashPrefix('!')
/*
    $routeProvider.
      when('/', {
        templateUrl: '/template/home.html'
      }).
      when('/view1', {
        templateUrl: 'template/partials/partial1.html'
      }).
      when('/view2', {
        templateUrl: 'template/partials/partial2.html'
      }).
      when('/remotepartial', {
        templateUrl: 'template/find/test.html'
      }).
      when('/login',{
        templateUrl: 'template/login',
        controller: 'LoginCtrl'
      }).
      when('/logout',{
        templateUrl: 'template/login.html',
        controller: 'LoginCtrl'
      }).
      when('/users', {
        templateUrl: 'template/users/index.html',
        controller: 'UsersController.index',
        action: 'index' // optional action for CRUD methods
      }).
      when('/users/new', {
        templateUrl: 'template/users/new.html',
        controller: 'UsersController.new',
        action: 'new' // optional action for CRUD methods
      }).
      when('/users/show/:id', {
        templateUrl: 'template/users/show.html',
        controller: 'UsersController.show',
        action: 'show' // optional action for CRUD methods
      }).
      when('/users/edit/:id', {
        templateUrl: 'template/users/edit.html',
        controller: 'UsersController.edit',
        action: 'edit' // optional action for CRUD methods
      }).
      when('/users/delete/:id', {
        templateUrl: 'template/users/index.html',
        controller: 'UsersController.delete',
        action: 'delete' // optional action for CRUD methods
      }).
      otherwise({
        templateUrl: 'template/error404.html'
        // redirectTo: '/login'
      });
*/
  }]).run(function($rootScope, $route){
    // Bind the `$routeChangeSuccess` event on the rootScope, so that we dont need to bind in individual controllers.
    $rootScope.$on('$routeChangeSuccess', function(currentRoute, previousRoute) {
      // This will set the custom property that we have defined while configuring the routes.
      if($route.current.action && $route.current.action.length > 0){
        //$rootScope.action = $route.current.action ;
      }
    });
});

