import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import{getAuth} from "firebase/auth";
import{getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyBtjqUhE3lCUlVIlzfuCEOtB8DUsrjkfH4",
  authDomain: "react-social-media-c4fc7.firebaseapp.com",
  projectId: "react-social-media-c4fc7",
  storageBucket: "react-social-media-c4fc7.appspot.com",
  messagingSenderId: "1088443840849",
  appId: "1:1088443840849:web:843a8d3248b05bfcb77b70"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);