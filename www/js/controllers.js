angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $rootScope, $state) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Check currentUser, if no currentUser it redirect to sign page
  var login_state = 'app.login';
  var currentUser = firebase.auth().currentUser;
  window.currentUser = currentUser;
  if(currentUser == null && $state.current.name != login_state) {
    $state.go(login_state);
  }
})

.controller('LoginCtrl', function($scope, $rootScope, $ionicViewService, $ionicSideMenuDelegate, $ionicLoading, $firebaseAuth, $state) {
  // Prevent swipe side menu from Login
  $ionicSideMenuDelegate.canDragContent(false);
  // Let's use AngularFire to auth the user to keep it session
  auth = $firebaseAuth();

  // Default login info just to be faster
  $scope.loginData = {
    email: 'ton.garcia.jr@gmail.com',
    password: ''
  };

  $scope.doLogin = function() {
    $ionicLoading.show({
      template: 'Autenticando...'
    }).then(function(){
      // The loading indicator is now displayed
      auth.$signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).then(function(fireUser) {
        // Sign user
        $ionicLoading.hide();
        if(fireUser == undefined) return;
        $rootScope.user = fireUser;

        // Prevent back button after login
        $ionicViewService.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });

        // Go to signed page
        $state.go('app.playlists');
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`${errorCode} - ${errorMessage}`);
        console.log(errorCode, errorMessage);
      });
    });
  }
})

.controller('PlaylistsCtrl', function($scope, $rootScope, Playlists) {
  console.log($rootScope.test);
  $scope.playlists = Playlists;

  $scope.createPlaylist = function() {
    var name = prompt("Playlist name");
    if (name) {
      $scope.playlists.$add({
        "name": name
      });
    }
  };
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
