// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "civilhub2-46a99.firebaseapp.com",
  projectId: "civilhub2-46a99",
  storageBucket: "civilhub2-46a99.firebasestorage.app",
  messagingSenderId: "530116381193",
  appId: "1:530116381193:web:dccc2127f531b3c82e46d8",
};

// Initialize Fireb ase
export const app = initializeApp(firebaseConfig);
