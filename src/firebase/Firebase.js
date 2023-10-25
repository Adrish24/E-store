import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";


// Configuration object with sensitive data stored in environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

// Initialize the Firebase app with the provided configuration
const FIREBASE_APP = initializeApp(firebaseConfig);



// Get the authentication service for the Firebase app
const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export default FIREBASE_AUTH;
export const db = getFirestore(FIREBASE_APP)
