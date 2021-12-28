import firebase from "firebase";
import 'firebase/firebase-auth';
import "firebase"
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyDumB-So8NHSTTPqWNK7psIuIjofxt_qa0",
  authDomain: "cladis-7eaa0.firebaseapp.com",
  projectId: "cladis-7eaa0",
  storageBucket: "cladis-7eaa0.appspot.com",
  messagingSenderId: "806193959954",
  appId: "1:806193959954:web:6758a4fd6f8baa5b9fb4cb",
  measurementId: "G-Z53W7MQNY5"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);