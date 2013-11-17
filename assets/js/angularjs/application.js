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
  'ngResource',
  'application.filters',
  'application.services',
  'application.directives',
  'application.constants',
  'application.controllers',
  'ui.router',
  'ui.bootstrap',
  'blueimp.fileupload',
  'pascalprecht.translate',
  'wu.masonry'
]).
config([ '$locationProvider','$httpProvider','$stateProvider', '$urlRouterProvider',
  function( $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    $httpProvider.defaults.headers.common['Accept'] = 'application/json';

    $locationProvider.html5Mode(true).hashPrefix('#');

    // 404 handler
    $urlRouterProvider.otherwise("/404");

    $stateProvider
    .state('index', {
      url: "/",
      templateUrl: "/templates/home.ejs"
    })
    .state('forgot_password', {
      url: "/user/forgot_password",
      templateUrl: '/templates/forgotPasswordForm.html'
      //controller: 'LoginCtrl'
    })
    .state('logout', {
      url: "/users/logout",
      controller: function($scope,$window){
        return $window.location.href = "/users/logout";
      }
    })
    .state('signup', {
      url: "/signup",
      templateUrl: '/templates/signup.html',
      controller: 'LoginCtrl',

    })
    .state('ActivityController', {
      url: "/activity",
      templateUrl: "/templates/activity/index.html",
      controller: 'ActivityController',
      resolve: {
        activitiesData: function(activityResolver){
          return activityResolver();
        }
      }
    })
    .state('ActivityController.activity', {
      url: "/:id",
      onEnter: function($stateParams, $state, $modal, $resource, activityShowResolver) {
        $modal.open({
          templateUrl: "/templates/activity/activity.html",
          controller: 'ActivityItemController',
          resolve: {
            activity: function(activityShowResolver){
              return activityShowResolver($stateParams);
            }
          }
        }).result.then(function(result) {
          console.info('no activity then',result);
          return $state.transitionTo("ActivityController");
        }, function () {
          console.info('Modal dismissed at: ' + new Date());
          return $state.transitionTo("ActivityController");
        });
      }
    })
    .state('ActivityController.activity.edit', {
      url: "/edit",
      onEnter: function($stateParams, $state, $modal, $resource, activityShowResolver) {
        $modal.open({
          templateUrl: "/templates/activity/activity.html",
          controller: 'ActivityItemController',
          resolve: {
            activity: function(activityShowResolver){
              return activityShowResolver($stateParams);
            }
          }
        }).result.then(function(result) {
          console.info('no activity edit then',result);
          return $state.transitionTo("ActivityController");
        }, function () {
          console.info('Modal edited dismissed at: ' + new Date());
          return $state.transitionTo("ActivityController");
        });
      }
    })
    .state('404', {
      url: "/404",
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

