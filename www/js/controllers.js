angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('LoginCtrl', function($scope, $rootScope, $ionicViewService, $ionicSideMenuDelegate, $ionicLoading, $state) {
  // Prevent swipe side menu from Login
  $ionicSideMenuDelegate.canDragContent(false);

  // Default login info just to be faster
  $scope.loginData = {
    email: 'ton.garcia.jr@gmail.com'
  };

  $scope.doLogin = function() {
    $ionicLoading.show({
      template: 'Autenticando...'
    }).then(function(){
      // The loading indicator is now displayed
      firebase.auth().signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).catch(function(error, authData){
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`${errorCode} - ${errorMessage}`);
        console.log(errorCode, errorMessage);
      }).then(function (response) {
        // Sign user
        $ionicLoading.hide();
        if(response == undefined) return;
        $rootScope.user = firebase.auth().currentUser;

        // Prevent back button after login
        $ionicViewService.nextViewOptions({
          disableAnimate: true,
          disableBack: true
        });

        // Go to signed page
        $state.go('app.playlists');
      });
    });
  }
})

.controller('PlaylistsCtrl', function($scope, Playlists) {
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
