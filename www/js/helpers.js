// Return the current user Ref to CRUD it childs elements
function currentUserRef(recipe) {
  //new Firebase(`${fire_base_server}/users/${window.user.uid}/${recipe}`);
  return firebase.database().ref().child(`${recipe}/${window.user.uid}`);
}
