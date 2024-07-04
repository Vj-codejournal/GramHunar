// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "complete-auth-9ae23.firebaseapp.com",
  projectId: "complete-auth-9ae23",
  storageBucket: "complete-auth-9ae23.appspot.com",
  messagingSenderId: "944042465592",
  appId: "1:944042465592:web:1afed0eaecd44e5dfdc9cd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)