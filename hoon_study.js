// 2016. 03. 23 - #가상promise #promise시험
// 요청할 api가 완성되지 않은 상황이고, 내가 받을 데이터를 하드코딩해서
// 그 이후의 로직(.then)을 미리 구성해 놓을 필요가 있을때
// 아래처럼 내가 임의의 promise를 만들면 된다.
// 왜냐면 http요청은 promise를 리턴하니깐.
// 이렇게 foo로 테스트를 하고, 나중에 api가 완성됐을때
// foo()만 실제 $http...으로 바꾸면 금방 완성되겠지.
// 실패상황을 가정하고 싶다면 resolve를 reject로 바꾸면 된다.

$scope.foo = function () {
  return new Promise((resolve, reject) => {
    timeout(() => {
      resolve({...});
    }, 500);
  });
};
// change privacy status of lecture when activate switch
// this function can be called when lecture is tutor's.
function changePrivacyStatus(privacyData) {
  $scope.privacyStatus = privacyData ? 'public' : 'private';
  var data = {
    videoId: $scope.videoId,
    status: $scope.privacyStatus
  };
  //$http.put('/api/lectures', data)
  foo(data)
  .then((res) => {
    showToast('Privacy status is changed');
  })
  .catch((e) => {
    $scope.privacyStatus = !$scope.privacyStatus;
    $scope.privacyData = !$scope.privacyData;
    console.error(e);
  });
}

// normalize css적용을 생각해볼 것
// (markdown converting 관련하여)


// 2016. 04. 05
controller들을 즉시실행함수로 감싸는 이유 : 전역변수 충돌을 야기할 수 있어서.


// 2016. 04. 07
혼동되거나 확실히 알고 싶은 지점에 debugger; 를 넣으면 그 지점의 상세정보를 확인할 수 있다.


// 2016. 04. 20
// codeschool에 있는 routeProvider 예제
angular.module('NoteWrangler')
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      redirectTo: '/notes'
    })
    .when('/users', {
      templateUrl: 'templates/pages/users/index.html',
      controller: 'UsersIndexController'
    })
    .when('/users/:id', {
      templateUrl: 'templates/pages/users/show.html',
      controller: 'UsersShowController'
    })
    .when('/notes', {
      templateUrl: '/templates/pages/notes/index.html',
      controller: 'NotesIndexController'
    })
    .when('/notes/new', {
      templateUrl: 'templates/pages/notes/edit.html',
      controller: 'NotesCreateController'
    })
    .when('/notes/:id', {
      templateUrl: 'templates/pages/notes/show.html',
      controller: 'NotesShowController'
    })
    .when('/notes/:id/edit', {
      templateUrl: 'templates/pages/notes/edit.html',
      controller: 'NotesEditController'
    })
    .when('/tweeted', {
      templateUrl: 'templates/pages/notes/tweeted.html',
      controller: 'TweetedController'
    })
    .otherwise({
      redirectTo: '/'
    });
}]);


// 2016. 04. 25
bower하나를 다른 것으로 대체했을 경우,
app.js와 bower.json에 있는 기존의 것을 삭제한 후 grunt serve로 한번 돌려서 완전히 날려버려야 한다.
(오늘은 angular-markdown과 showdownjs를 ng-showdown으로 대체하는 작업을 했음.)

* bower에 ^대신 ~로 설치하는방법 (ng-showdown을 예로들어)
bower info ng-showdown치면
맨밑에 available 머시기 나오는데 여기에서 가장 위에버전으로 설치한다.
1.1.0 이라고 하면,

bower install ng-showdown #~1.1.0
이렇게 설치하면댐.

// web server 와 app server ?

// 2016. 05. 23
GIT REPOSITORY로 프로젝트 관리하기 (ssh연결을 통해)
step1). ssh key 생성 (terminal: ssh-keygen)

step2). github 계정정보에 ssh key등록 (id_rsa-pub을 복사, 붙여넣기)

step3). 해당 프로젝트 폴더로 이동, git init > git remote add origin 내 리파지토리의 ssh주소 > git push -u origin master
예상 에러 : origin branch가 이미 있다고하면? > git remote rm origin으로 삭제한 후, 다시 git remote add ~ 하면 된다.
          push할때 에러가 난다면? > readme file로 인한 문제일 수 있으니 push하기 전에 리파지토리의 내용을 먼저 내려받은 후 적용하고, 다시 push하면 된다.

git push 할때마다 username과 password를 물어본다면?
'git credential'로 세팅을 통해 다음부터 과정을 생략할 수 있다.
