import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API,
    authDomain: "party-website-8605b.firebaseapp.com",
    projectId: "party-website-8605b",
    storageBucket: "party-website-8605b.appspot.com",
    messagingSenderId: "1019250773348",
    appId: "1:1019250773348:web:a6fb3e42520455b1fa7e71",
    measurementId: "G-M8PD87VXZ4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);