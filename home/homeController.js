'use strict';

angular.module('myApp')
.controller('HomeCtrl', function ($scope, myFactory, $http) {
  $scope.greeting = 'HERE IS /HOME';

  $scope.note = {
    title: 'fucking note title',
    page: 236,
    data: 'PASS DATA CONTROLLER to SERVICE'
  };

  $scope.fruitNames = ['Apple', 'Banana', 'Orange'];
  $scope.readonly = false;
  $scope.tags = [];

  $scope.description = 'hey man what the fuck ringa ringa ringa ring ~~';

  var apiKey = 'AIzaSyBn9P25uTuVvCZkJhcs2Tvjw7Fe2fPtUGY';

  $scope.findVideo = function (videoId) {
    $http.get('https://www.googleapis.com/youtube/v3/videos?id='
    + videoId + '&key=' + apiKey + '&part=snippet,contentDetails,statistics,status')
    .then(function(res) {
      console.log(res);
      onYouTubeIframeAPIReady();
    })
    .catch(function(e) {
      console.error(e);
    })
  }

  myFactory.showData($scope.note);


  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: $scope.videoId,
      events: {
        // 'onReady': onPlayerReady,
        // 'onStateChange': onPlayerStateChange
      }
    });
  }

});
