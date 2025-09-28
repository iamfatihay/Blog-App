import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase konfigürasyonu - GERÇEK PROJE
const firebaseConfig = {
    apiKey: "AIzaSyBsFeDWgcz8pw8pQClZvOacwujPc74GijM",
    authDomain: "blog-app-f63f6.firebaseapp.com",
    projectId: "blog-app-f63f6",
    storageBucket: "blog-app-f63f6.firebasestorage.app",
    messagingSenderId: "1091947701763",
    appId: "1:1091947701763:web:45e1780e90262c1831d036",
    measurementId: "G-8G6ER3Q9WS",
};

// Demo modu kapalı - gerçek Firebase kullanılıyor
export const isDemoMode = false;

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth, Firestore ve Analytics servislerini al
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
