// Firebase settings
fire_base_server = 'https://estudo-d7aa5.firebaseio.com';
fireBaseSettings = {
  apiKey: "AIzaSyDZetejVIWws4Dq-POdgLG9hw1NqdBgqS8",
  authDomain: "estudo-d7aa5.firebaseapp.com",
  databaseURL: "https://estudo-d7aa5.firebaseio.com",
  storageBucket: "estudo-d7aa5.appspot.com"
};

// Initialize firebase
firebase.initializeApp(fireBaseSettings);

// Init current user as global
var currentUser = firebase.auth().currentUser;
