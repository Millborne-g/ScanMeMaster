// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_4cNoh3klH4mKPSd7dhJzr5QUGoLihy8",
  authDomain: "scanmemaster-9da58.firebaseapp.com",
  projectId: "scanmemaster-9da58",
  storageBucket: "scanmemaster-9da58.appspot.com",
  messagingSenderId: "270970295536",
  appId: "1:270970295536:web:02ecd24ee665578e6d9e35",
  measurementId: "G-27WEKS22GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)