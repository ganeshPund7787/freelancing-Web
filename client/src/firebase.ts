import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "civilhub-bdfc9.firebaseapp.com",
  projectId: "civilhub-bdfc9",
  storageBucket: "civilhub-bdfc9.appspot.com",
  messagingSenderId: "338991441985",
  appId: "1:338991441985:web:3f0115829f86a33c0c3ec0",
};

export const app = initializeApp(firebaseConfig);
