// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/**
 * Method to login a user with email and password. You will have to create a user manually in the firebase dashboard
 */
export const logInWithEmailAndPassword = async (email, password, callback) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    callback("Email oder Passwort falsch");
  }
};

/**
 * Method to logout a user
 */
export const logout = () => {
  signOut(auth);
};
