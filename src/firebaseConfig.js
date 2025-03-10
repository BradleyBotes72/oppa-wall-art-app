// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTusGGAAszJwt6kFWDWfUznpSZXE-vNbM",
  authDomain: "oppa-wall-art.firebaseapp.com",
  projectId: "oppa-wall-art",
  storageBucket: "oppa-wall-art.appspot.com", // Corrected bucket
  messagingSenderId: "166438967591",
  appId: "1:166438967591:web:70914f8871a5e4d0057102",
  measurementId: "G-LF22TRLCX6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
