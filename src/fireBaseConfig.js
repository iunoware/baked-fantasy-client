// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDFjJafGY5Fp0P1o9EVCCkXpqPWKX7KefE",
  authDomain: "the-baked-fantasy-6d54d.firebaseapp.com",
  projectId: "the-baked-fantasy-6d54d",
  storageBucket: "the-baked-fantasy-6d54d.firebasestorage.app",
  messagingSenderId: "658418444503",
  appId: "1:658418444503:web:69d10c8741f6e8ff93e892",
  measurementId: "G-VSK9WXMH51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
