Firebase Auth
=============

The firebase use the Object ``` $firebaseAuth ``` to create, sign in and sign out users, even with OAuth.
To use Firebase Auth it must be set in the Firebase console.


<br>
### Session Management


##### Create an user
To create user we just need ```e-mail``` & ```password``` by ```createUser``` method, and add it just like it ref (referring the Firebase app)
```javascript
   var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
   ref.createUser({
     email    : "bobtony@firebase.com",
     password : "correcthorsebatterystaple"
   }, function(error) {
     // Handle error
   }).then(function(authData){
    // IMPORTANT: it is necessary to create it then, on the Doc it say that the catch return the authData, but it is not true
    if(authData == undefined) return;
   });
```

##### Sign an user
To sign an user we just need ```e-mail``` & ```password``` by ```authWithPassword``` method, and add it just like it ref (referring the Firebase app).
```javascript
  var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
  ref.authWithPassword({
    email    : "bobtony@firebase.com",
    password : "correcthorsebatterystaple"
  }, function(error, authData) {
    // error logic
  }).then(function(authData){
    // IMPORTANT: it is necessary to create it then, on the Doc it say that the catch return the authData, but it is not true
    if(authData == undefined) return;
  });;
```




Ionic App Base
=====================

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/driftyco/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic
```

Then run: 

```bash
$ ionic start myProject tabs
```

More info on this can be found on the Ionic [Getting Started](http://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/driftyco/ionic-cli) repo.

## Issues
Issues have been disabled on this repo, if you do find an issue or have a question consider posting it on the [Ionic Forum](http://forum.ionicframework.com/).  Or else if there is truly an error, follow our guidelines for [submitting an issue](http://ionicframework.com/submit-issue/) to the main Ionic repository.
