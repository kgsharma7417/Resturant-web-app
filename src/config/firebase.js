import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxC-mtFq4tRBqAj8SN94HdTWSgFj8rGi8",
  authDomain: "restrrant.firebaseapp.com",
  projectId: "restrrant",
  storageBucket: "restrrant.firebasestorage.app",
  messagingSenderId: "490933174157",
  appId: "1:490933174157:web:5a3353498a4f1467ff87c4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
