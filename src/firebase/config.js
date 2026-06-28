import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentSingleTabManager } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase web config is public client configuration; env vars can still override it per deployment.
const hostedFirebaseConfig = {
  apiKey: "AIzaSyDvwzLMJ-TQGJX4pnCpl1RlRo5aDSQU6l4",
  authDomain: "creatify-bd.firebaseapp.com",
  projectId: "creatify-bd",
  storageBucket: "creatify-bd.firebasestorage.app",
  messagingSenderId: "365570308132",
  appId: "1:365570308132:web:47c328634ce4e2d148c0b1",
  measurementId: "G-C9RJV5QFZM"
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || hostedFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || hostedFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || hostedFirebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || hostedFirebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || hostedFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || hostedFirebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || hostedFirebaseConfig.measurementId
};

// Initialize Firebase (Singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Services
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({
      tabManager: persistentSingleTabManager()
    })
  });
} catch (error) {
  db = getFirestore(app);
}
const auth = getAuth(app);
const storage = getStorage(app);

// Analytics (with support check)
let analytics = null;
isSupported().then(yes => {
  if (yes) analytics = getAnalytics(app);
});

export { db, auth, storage, analytics };
export default app;


