angular.module('starter.factories', [])
.factory("Playlists", function($firebaseArray) {
  // Retrieve all playlists
  var getAll = function() {
    var fireRef = firebase.database().ref();
    var playlistsRef = fireRef.child("playlists");
    return $firebaseArray(playlistsRef);
  };

  // Create a playlist
  var create = function($scope, object) {
    $scope.playlists.$add(object);
  };

  return {
    getAll: getAll,
    create: create,
  };
});
