// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase', 'starter.controllers', 'starter.factories', 'starter.services'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    // Ionic Path
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/ionic/layouts/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/ionic/login.html',
          controller: 'IonicLoginCtrl'
        }
      }
    })

    // .state('app.playlists', {
    //   url: '/playlists',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/ionic/playlists.html',
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })
    //
    // .state('app.single', {
    //   url: '/playlists/:playlistId',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/ionic/playlist.html',
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // })

    // Material Path
    .state('material', {
      url: '/material',
      abstract: true,
      templateUrl: 'templates/material/layouts/menu.html',
      controller: 'AppCtrl'
    })

    .state('material.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/material/login.html',
          controller: 'MaterialLoginCtrl'
        }
      }
    })

    // .state('material.playlists', {
    //   url: '/playlists',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/material/playlists.html',
    //       controller: 'PlaylistsCtrl'
    //     }
    //   }
    // })
    //
    // .state('material.single', {
    //   url: '/playlists/:playlistId',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/material/playlist.html',
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});


/* global angular, document, window */
'use strict';
var factories = angular.module('starter.factories', ["ionic", "firebase"]);
var services = angular.module('starter.services', ["ionic", "firebase"]);
var directives = angular.module('starter.directives', ["ionic", "firebase"]);
var controllers = angular.module('starter.controllers', []);
controllers.controller('AppCtrl', function ($scope, $ionicModal, $ionicPopover, $timeout) {
});
