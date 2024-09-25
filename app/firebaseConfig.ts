// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH3jHWTBg2UNJAqbln_-TBFCOLPf-kY8I",
  authDomain: "fir-a48d7.firebaseapp.com",
  projectId: "fir-a48d7",
  storageBucket: "fir-a48d7.appspot.com",
  messagingSenderId: "495161413353",
  appId: "1:495161413353:web:b5ec839fcb4346bbf16a78",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
