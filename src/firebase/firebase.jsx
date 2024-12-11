import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBWP-7jvO-Hd1vlxrXedeoMZj55UcFtrgI",
  authDomain: "filmyverse-c7907.firebaseapp.com",
  projectId: "filmyverse-c7907",
  storageBucket: "filmyverse-c7907.firebasestorage.app",
  messagingSenderId: "667952736797",
  appId: "1:667952736797:web:ba87d07cd6639f4117f4f4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");

export default app;