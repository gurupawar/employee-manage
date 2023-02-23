import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBuTaNDDdNiZtxic878fsJy47r7TZ8kIbY",
  authDomain: "emp-data-cd460.firebaseapp.com",
  databaseURL: "https://emp-data-cd460-default-rtdb.firebaseio.com",
  projectId: "emp-data-cd460",
  storageBucket: "emp-data-cd460.appspot.com",
  messagingSenderId: "891658757758",
  appId: "1:891658757758:web:f2cd2daf4cb760ec5fda2f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();
export { db, auth };
