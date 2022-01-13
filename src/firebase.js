import firebase from "firebase";
// var firebaseConfig = {
//   apiKey: "AIzaSyAxgdiBbF63wN3rXXC5x12bDz668iXUCcg",
//   authDomain: "breederpush.firebaseapp.com",
//   databaseURL: "https://breederpush.firebaseio.com",
//   projectId: "breederpush",
//   storageBucket: "breederpush.appspot.com",
//   messagingSenderId: "981834236589",
//   appId: "1:981834236589:web:72c7578e5c882fcd56fc24",
//   measurementId: "G-695X19L25S",
// };
 var firebaseConfig = {
    apiKey: "AIzaSyCeeIIKfHsThKMacr89ssnnCNpK-xugCFE",
    authDomain: "logly-4542e.firebaseapp.com",
    databaseURL: "https://breederpush.firebaseio.com",
    projectId: "logly-4542e",
    storageBucket: "logly-4542e.appspot.com",
    messagingSenderId: "327844760153",
    appId: "1:327844760153:web:c3798efb122a39fb467f48",
    measurementId: "G-JPJHLB2R2F"
  };

// Initialize Firebase
console.log('configuring firebase .. ');
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export default firebase
