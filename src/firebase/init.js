import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmN4ExLpxd34-kxHpFgd3Ld8YMRO2jmZI",
  authDomain: "emp-manage-aee90.firebaseapp.com",
  projectId: "emp-manage-aee90",
  storageBucket: "emp-manage-aee90.appspot.com",
  messagingSenderId: "1098792886072",
  appId: "1:1098792886072:web:98cc9c6d6e1acaf2b06bcd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth();
export { db, auth };
