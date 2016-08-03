angular.module('starter.factories', [])
.factory("Playlists", function($firebaseArray) {
  // Current user Playlists ref
  var currentUserPlaylistsRef = currentUserRef('playlists');

  // Retrieve all playlists
  var getAll = function() {
    // just return it current user playlists ref array
    return $firebaseArray(currentUserPlaylistsRef);
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
