import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZbDdn2XV8vIE3vr8Z-tN0RqZD8LIm00A",
  authDomain: "trackact-962ac.firebaseapp.com",
  projectId: "trackact-962ac",
  storageBucket: "trackact-962ac.firebasestorage.app",
  messagingSenderId: "1041130770179",
  appId: "1:1041130770179:web:ef7a97611d45f5acf62336",
  measurementId: "G-39W9GZ00ET"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)
const googleProvider = new GoogleAuthProvider()

export {auth, db, googleProvider}