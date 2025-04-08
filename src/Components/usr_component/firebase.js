// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your Firebase configuration from the Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyAzexNWFpH3Hbf2jbcNvjk9RcUv8Qy14kg",
    authDomain: "shop-project-edd8e.firebaseapp.com",
    projectId: "shop-project-edd8e",
    storageBucket: "shop-project-edd8e.firebasestorage.app",
    messagingSenderId: "373089656545",
    appId: "1:373089656545:web:d9912cb5b329a65d8e21a0",
    measurementId: "G-G7K5XZC69R"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { db, auth, app };
