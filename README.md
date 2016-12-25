Firebase Study
=============

Using [__Ionic v1__](http://ionicframework.com/docs/v1/), [__AngularFire__](https://github.com/firebase/angularfire) and [__Querybase__](https://github.com/davideast/Querybase) to create a 
simple playlist example app with session management.



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



<br>
### Add items to user

##### Simple Real-Time Array
To add & sync objects we use $array ``` $firebaseArray ```
*If it throws an error like: "permission_denied: Client doesn't have permission to access the desired data", it can be:
 * The rules are not set properly
 * The user is not assigned as signed for the request
```javascript
  .factory("Playlists", function($firebaseArray) {
    var itemsRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/items");
    return $firebaseArray(itemsRef);
  })
```


<br>
### IMPORTANT mentions for AngularFire

The AngularFire Objects and methods reference are available on [https://github.com/firebase/angularfire/blob/master/docs/reference.md](https://github.com/firebase/angularfire/blob/master/docs/reference.md)
1. AngularFire is also not ideal for synchronizing deeply nested collections inside of collections. In general, deeply nested collections [should typically be avoided](https://www.firebase.com/docs/web/guide/structuring-data.html#section-denormalizing-data) in distributed systems.
2. The primary purpose of AngularFire is to __manage synchronized data__, which is exposed through the ```$firebaseObject``` and ```$firebaseArray```.
3. To keep the user session on angularFire requests we need to use it angularFire auths methods ``` $firebaseAuth ```
  ```javascript
    // Let's use AngularFire to auth the user to keep it session
    auth = $firebaseAuth();
    $scope.loginData = {
      email: '',
      password: ''
    };
    
    $scope.doLogin = function() {
      auth.$signInWithEmailAndPassword($scope.loginData.email, $scope.loginData.password).then(function(fireUser) {
        $rootScope.user = fireUser;
      }).catch(function(error){
        console.log(error);
      });
    });
  ```


4. __MOST IMPORTANT__: The AngularFire doesn't have a callback defined by the dev, it is a AngularFire inside feature. To print it value we doesn't use console, use angular json filter.
  ```javascript
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    $scope.data = $firebaseObject(ref);
    // The obj variable will appear to be empty here and won't contain any remote data,
    // because the request to the server has not returned when we reach this line.
    console.log($scope.data);
  ```
  ```html
    <pre>{{ data | json }}</pre>
  ```
5. Sometimes we need just the Firebase web, not the AngularFire:
  ```javascript
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    // We don't always need AngularFire!
    //var obj = $firebaseObject(ref);
    // For example, if we just want to increment a counter, which we aren't displaying locally,
    // we can just set it using the SDK
    ref.child("foo/counter").transaction(function(currentValue) {
      return (currentValue || 0) + 1;
    });
  ```
6. If using the FirebaseWeb SDK (not AngularFire) sync: 
  ```javascript
    var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
    ref.on("value", function(snapshot) {
      // This isn't going to show up in the DOM immediately, because
      // Angular does not know we have changed this in memory.
      // $scope.data = snapshot.val();
      // To fix this, we can use $scope.$apply() to notify Angular that a change occurred.
      $scope.$apply(function() {
        $scope.data = snapshot.val();
      });
    });
  ```
7. When ``` $firebaseArray ``` might be used:
  Synchronized arrays should be used for any list of objects that will be sorted, iterated, and which have unique IDs. The synchronized array assumes that items are added using [$add()](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-addnewdata), and that they will therefore be keyed using Firebase [push IDs](https://www.firebase.com/docs/web/guide/saving-data.html#section-push).
  We create a synchronized array with the $firebaseArray service. The array is sorted [in the same order](https://www.firebase.com/docs/web/guide/retrieving-data.html#section-ordered-data) as the records on the server. In other words, we can pass a [query](https://www.firebase.com/docs/web/guide/retrieving-data.html#section-queries) into the synchronized array, and the records will be sorted according to query criteria.
  While the array isn't technically read-only, it has some special requirements for modifying the structure (removing and adding items) which we will cover below.
  ```javascript
    // define our app and dependencies (remember to include firebase!)
    var app = angular.module("sampleApp", ["firebase"]);
    // inject $firebaseArray into our controller
    app.controller("ProfileCtrl", ["$scope", $firebaseArray",
      function($scope, $firebaseArray) {
        // REF to firebase DB messages list (receipt)
        var messagesRef = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/messages"); 
        // download the data from a Firebase reference into a (pseudo read-only) array
        // all server changes are applied in realtime
        $scope.messages = $firebaseArray(messagesRef);
        // create a query for the most recent 25 messages on the server
        var query = messagesRef.orderByChild("timestamp").limitToLast(25);
        // the $firebaseArray service properly handles database queries as well
        $scope.filteredMessages = $firebaseArray(query);
      }
    ]);
  ``` 
  Add it info to a list view
  ```html
  <ul>
    <li ng-repeat="message in messages">{{ message.user }}: {{ message.text }}</li>
  </ul>
  ```
  Add a remove button (delete items from the array
  ```html
    <ul>
      <li ng-repeat="message in messages">
        Message data located at node /messages/{{ message.$id }}
      </li>
    </ul>
  ```
  
##### Reference and Summary API
--------------------------------
| API Method  | Method Description |
| ------------- | ------------- |
| [$add(data)](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-addnewdata)  | Creates a new record in the array. Should be used in place of push() orsplice().  |
| [$remove(recordOrIndex)](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-removerecordorindex)  | Removes an existing item from the array. Should be used in place ofpop() or splice().  |
| [$save(recordOrIndex)](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-saverecordorindex)  | Saves an existing item in the array.  |
| [$getRecord(key)](https://www.firebase.com/docs/web/libraries/angular/api.html#angularfire-firebasearray-getrecordkey)  | Given a Firebase database key, returns the corresponding item from the array. It is also possible to find the index with $indexFor(key).  |


##### Meta fields
--------------------------------
