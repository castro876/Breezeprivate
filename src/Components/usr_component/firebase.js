// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyC32aWVnMmnx49VITsfgx9OmrlbwUZDs1U",
  authDomain: "react-project-x-f0c3a.firebaseapp.com",
  projectId: "react-project-x-f0c3a",
  storageBucket: "react-project-x-f0c3a.firebasestorage.app",
  messagingSenderId: "309422066524",
  appId: "1:309422066524:web:77db325d0edd9156678f99",
  measurementId: "G-5WER8HR08Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth, app };
