'use strict';

angular.module('myApp')
.controller('HomeCtrl', HomeCtrl)
.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function () {
    // Component lookup should always be available since we are not using `ng-if`
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };
});

// WORKING PLACE
HomeCtrl.prototype.showDialog = function() {
  var position = this._mdPanel.newPanelPosition()
      .absolute()
      .right()
      .top();

  var animation = this._mdPanel.newPanelAnimation();

  switch(this.openFrom) {
    case 'button':
      animation.openFrom('.animation-target');
      break;
    case 'corner':
      animation.openFrom({top:0, left:0});
      break;
    case 'bottom':
      animation.openFrom({
        top: document.documentElement.clientHeight,
        left: document.documentElement.clientWidth / 2 - 250
      });
  }
  switch(this.closeTo) {
    case 'button':
      animation.closeTo('.animation-target');
      break;
    case 'corner':
      animation.closeTo({top:0, left:0});
      break;
    case 'bottom':
      animation.closeTo({
        top: document.documentElement.clientHeight,
        left: document.documentElement.clientWidth / 2 - 250
      });
  }

  switch(this.animationType) {
    case 'custom':
      animation.withAnimation({
        open: 'demo-dialog-custom-animation-open',
        close: 'demo-dialog-custom-animation-close'
      });
      break;
    case 'slide':
      animation.withAnimation(this._mdPanel.animation.SLIDE);
      break;
    case 'scale':
      animation.withAnimation(this._mdPanel.animation.SCALE);
      break;
    case 'fade':
      animation.withAnimation(this._mdPanel.animation.FADE);
      break;
    case 'none':
      animation = undefined;
      break;
  }

  var config = {
    animation: animation,
    attachTo: angular.element(document.body),
    controller: DialogCtrl,
    controllerAs: 'ctrl',
    templateUrl: 'panel.tmpl.html',
    panelClass: 'demo-dialog-example',
    position: position,
    trapFocus: true,
    zIndex: 150,
    clickOutsideToClose: true,
    clickEscapeToClose: true,
    hasBackdrop: true,
  };

  this._mdPanel.open(config);
};


// Necessary to pass locals to the dialog template.
function DialogCtrl(mdPanelRef) {
  this._mdPanelRef = mdPanelRef;
}

DialogCtrl.prototype.closeDialog = function() {
  this._mdPanelRef && this._mdPanelRef.close();
};



function HomeCtrl($scope, myFactory, $http, $timeout, $mdSidenav, $log, $mdPanel) {
  $scope.greeting = 'HERE IS /HOME';



  this._mdPanel = $mdPanel;
  this.openFrom = 'button';
  this.closeTo = 'button';
  this.animationType = 'none';




  $scope.note = {
    title: 'fucking note title',
    page: 236,
    data: 'PASS DATA CONTROLLER to SERVICE'
  };

  $scope.fruitNames = ['Apple', 'Banana', 'Orange'];
  $scope.readonly = false;
  $scope.tags = [];

  $scope.description = 'hey man what the fuck ringa ringa ringa ring ~~';

  $scope.determinateValue = 20;

  // YOUTUBE API AREA
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







  // SIDENAV TEST CODES
  $scope.toggleLeft = buildDelayedToggler('left');
  $scope.toggleRight = buildToggler('right');
  $scope.toggleLeft = buildToggler('left');
  $scope.isOpenRight = function(){
    return $mdSidenav('right').isOpen();
  };

  /**
   * Supplies a function that will continue to operate until the
   * time is up.
   */
  function debounce(func, wait, context) {
    var timer;

    return function debounced() {
      var context = $scope,
          args = Array.prototype.slice.call(arguments);
      $timeout.cancel(timer);
      timer = $timeout(function() {
        timer = undefined;
        func.apply(context, args);
      }, wait || 10);
    };
  }

  /**
   * Build handler to open/close a SideNav; when animation finishes
   * report completion in console
   */
  function buildDelayedToggler(navID) {
    return debounce(function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }, 200);
  }

  function buildToggler(navID) {
    return function() {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
    }
  }

  $scope.testfunc = testfunc;
  function testfunc() {
    console.log('test');
    return true;
  }
}
