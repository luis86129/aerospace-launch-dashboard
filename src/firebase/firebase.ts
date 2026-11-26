// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxL0PLzPjxv5MDkac2UZzKoLPZH4NgxnE",
  authDomain: "aerospace-launch-dashboard.firebaseapp.com",
  projectId: "aerospace-launch-dashboard",
  storageBucket: "aerospace-launch-dashboard.firebasestorage.app",
  messagingSenderId: "470908065294",
  appId: "1:470908065294:web:3d829e4f53ee1a0c9f0e5f",
  measurementId: "G-ZWCVHL4HDC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const database = getDatabase(app);