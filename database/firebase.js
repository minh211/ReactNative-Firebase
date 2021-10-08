import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBA0Nc4Fey0D1O63lqL9YVJU9hGkH0FYg0",
  authDomain: "react-native-rentalz.firebaseapp.com",
  projectId: "react-native-rentalz",
  storageBucket: "react-native-rentalz.appspot.com",
  messagingSenderId: "138497520435",
  appId: "1:138497520435:web:d01922c06b64c78eb1c446",
  measurementId: "G-GL0H9KWLTC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};
