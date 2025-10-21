// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQVoemXsj6NphKrYRZMBHC45KYxXkN1DU",
  authDomain: "astro-24868.firebaseapp.com",
  projectId: "astro-24868",
  storageBucket: "astro-24868.firebasestorage.app",
  messagingSenderId: "1097794397623",
  appId: "1:1097794397623:web:69b08a079a030968ecb432",
  measurementId: "G-YVL119LX0W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;