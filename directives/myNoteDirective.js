angular.module('myApp')
.directive('myNote', function () {
  return {
    restrict: 'E',
    templateUrl: '/directives/myNoteDirective.html',
    scope: {
      foo: '='
    },
    // DOM이 모두 렌더링 된 이후에 불리는 안전한 함수.
    link: function (scope, element, attr) {
      console.log(attr);
    }
  };
})
