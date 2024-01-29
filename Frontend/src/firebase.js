// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, 
  authDomain: "blog-ecaf0.firebaseapp.com",
  projectId: "blog-ecaf0",
  storageBucket: "blog-ecaf0.appspot.com",
  messagingSenderId: "292880198248",
  appId: "1:292880198248:web:f3f0ea8a830b960a38a9dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {
  app
}