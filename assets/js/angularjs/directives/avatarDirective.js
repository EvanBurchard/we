// A simple directive to display a gravatar image given an email
angular.module('application.directives')
  .directive('avatar', ['$compile',
  function($compile) {
    return{
      restrict:"EAC",
      link:function (scope, elm, attrs) {
        scope.$watch(attrs.avatar, function (uid) {
          if ((uid !== null) && (uid !== undefined) && (uid !== '')) {
           var tag = '<img class="img-rounded avatar-small" data-ng-src="/user/avatar/' + uid +'">';
          } else {
            var tag = '<img class="img-rounded avatar-small" data-ng-src="/imgs/avatars/user-avatar.png">';
          }
          elm.html( $compile(tag)(scope) );
        });
      }
    };
  }
]);
