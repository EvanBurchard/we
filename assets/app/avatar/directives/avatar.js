(function() {

  define([
    'angular'
  ], function (
    angular
  ) {

    // A simple directive to display a gravatar image given an email
    return angular.module('application.directives')
      .directive('avatar', [
      '$compile',
      function($compile) {
        return{
          restrict:"EAC",
          link:function (scope, elm, attrs) {
            console.log('attrs',attrs);

            var size_class;

            switch(attrs['avatarSize']) {
              case 'medium':
                size_class = ' width="150px" height="150px" class="img-rounded avatar-medium" ';
                break;
              default:
                size_class = ' width="50px" height="50px" class="img-rounded avatar-small" ';
            }

            scope.$watch(attrs.avatar, function (uid) {
              var tag;

              if ((uid !== null) && (uid !== undefined) && (uid !== '')) {
                tag = '<img '+size_class+' data-ng-src="/user/avatar/' + uid +'">';
              } else {
                tag = '<img '+size_class+' data-ng-src="/imgs/avatars/user-avatar.png">';
              }
              elm.html( $compile(tag)(scope) );
            });
          }
        };
      }
    ]);
  });
}());
