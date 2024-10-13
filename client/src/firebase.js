
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-2bc26.firebaseapp.com",
  projectId: "blog-2bc26",
  storageBucket: "blog-2bc26.appspot.com",
  messagingSenderId: "487974255154",
  appId: "1:487974255154:web:c34260ff29798ed2701a2b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);