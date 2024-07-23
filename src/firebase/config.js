// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBivRUb6VTjR4S4snAL31UcSlhBxtfj3jQ",
  authDomain: "react-login-56975.firebaseapp.com",
  projectId: "react-login-56975",
  storageBucket: "react-login-56975.appspot.com",
  messagingSenderId: "576136894786",
  appId: "1:576136894786:web:4ee24bcd02732f4b53d0db"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);


