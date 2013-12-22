define(['angular'], function (angular) {

  var Application = Application || {};

  Application.Constants = angular.module('application.constants', []);
  Application.Services = angular.module('application.services', []);
  Application.Controllers = angular.module('application.controllers', []);
  Application.Filters = angular.module('application.filters', []);
  Application.Directives = angular.module('application.directives', []);

  return Application;
});