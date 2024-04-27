import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvoleyhF7xLt_FAO5hgvjrmGTkmjVebcs",
  authDomain: "razglabati.firebaseapp.com",
  projectId: "razglabati",
  storageBucket: "razglabati.appspot.com",
  messagingSenderId: "397923218880",
  appId: "1:397923218880:web:5136a357ea43665b660425",
  measurementId: "G-QTZN0VE3RP",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
