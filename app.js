'use strict';

angular.module('myApp', [
  'ngRoute',
  'ngMaterial'
])
.config(function ($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: '/home/home.html',
    controller: 'HomeCtrl'
  });
})
// .directive('myNote', function () {
//   return {
//     restrict: 'E',
//     templateUrl: 'myNoteDirective.html',
//     scope: {
//       foo: '='
//     },
//     // DOM이 모두 렌더링 된 이후에 불리는 안전한 함수.
//     link: function (scope, element, attr) {
//       console.log(scope.foo);
//     }
//   };
// })

.factory('myFactory', function () {
  return {
    showData: function (note) {
      console.log(note.data);
    }
  };
})

.controller('MainCtrl', function ($scope) {
  $scope.foo = 'HERE IS INDEX.HTML';
});
