// A simple directive to display a gravatar image given an email
Application.Directives.directive('avatar', ['$compile',
  function($compile) {
    return{
      restrict:"EAC",
      link:function (scope, elm, attrs) {
        scope.$watch(attrs.avatar, function (imageId) {
          if ((imageId !== null) && (imageId !== undefined) && (imageId !== '')) {
           var tag = '<img class="img-rounded avatar-small" data-ng-src="/images/' + imageId +'">';
          } else {
            var tag = '<img class="img-rounded avatar-small" data-ng-src="/imgs/avatars/user-avatar.png">';
          }
          elm.html( $compile(tag)(scope) );
        });
      }
    };
  }
]);
