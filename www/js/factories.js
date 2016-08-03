angular.module('starter.factories', [])
.factory("Playlists", function($firebaseArray) {
  var getAll = function() {
    var fireRef = firebase.database().ref();
    var playlistsRef = fireRef.child("playlists");
    return $firebaseArray(playlistsRef);
  };

  return {
    getAll: getAll
  };
});
