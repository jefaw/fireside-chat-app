// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjOusaks5f2j8jisxpqBc5-Uf87SX9eZM",
    authDomain: "bold-cable-407004.firebaseapp.com",
    projectId: "bold-cable-407004",
    storageBucket: "bold-cable-407004.appspot.com",
    messagingSenderId: "171186982067",
    appId: "1:171186982067:web:bc928666420158814f74c6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();