import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase only if config is provided
export const app = firebaseConfig.apiKey ? initializeApp(firebaseConfig) : null;
export const auth = app ? getAuth(app) : null;
export const db = app ? getFirestore(app) : null;

const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  if (!auth) throw new Error("Firebase is not configured.");
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}

export async function logout() {
  if (!auth) return;
  return signOut(auth);
}

// Sync utilities
export async function saveUserData(uid: string, data: any) {
  if (!db) return;
  try {
    await setDoc(doc(db, "users", uid), data, { merge: true });
  } catch (err) {
    console.error("Failed to save to Firestore", err);
  }
}

export async function loadUserData(uid: string) {
  if (!db) return null;
  try {
    const d = await getDoc(doc(db, "users", uid));
    return d.exists() ? d.data() : null;
  } catch (err) {
    console.error("Failed to load from Firestore", err);
    return null;
  }
}
