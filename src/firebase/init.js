// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
   authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
   databaseURL: import.meta.env.VITE_REACT_APP_FIREBASE_DATABASE_URL,
   projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
   storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
   messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
   appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
   measurementId: import.meta.env.VITE_REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
// const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();