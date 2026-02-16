import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCWI6Ic9C_lJknIBVifyBJtEXWUbquxpHM",
    authDomain: "diravida-thalaimurai.firebaseapp.com",
    projectId: "diravida-thalaimurai",
    storageBucket: "diravida-thalaimurai.firebasestorage.app",
    messagingSenderId: "486213751506",
    appId: "1:486213751506:web:268198533b16daa107530b",
    measurementId: "G-KETJJSJQMK"
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
