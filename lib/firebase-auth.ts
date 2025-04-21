/**
 * Firebase Authentication Service
 *
 * This file provides a simplified interface for Firebase authentication
 * with both email/password and Google authentication methods.
 */

import {
  getAuth as getFirebaseAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  type User,
  type Auth,
} from "firebase/auth";
import { firebaseApp } from "./firebase"; // Keep the import for firebaseApp

// Lazy initialization of Firebase Auth
let authInstance: Auth | null = null;

// Get auth instance with lazy initialization
export const getAuth = () => {
  if (!authInstance && firebaseApp && typeof window !== "undefined") {
    try {
      authInstance = getFirebaseAuth(firebaseApp);
      console.log("Firebase Auth initialized successfully");
    } catch (error) {
      console.error("Error initializing Firebase Auth:", error);
      return null;
    }
  }
  return authInstance;
}

/**
 * Sign in with email and password
 * @param email User's email
 * @param password User's password
 * @returns Promise resolving to the user credentials
 */
export const signInWithEmail = async (email: string, password: string) => {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase Auth is not initialized");

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Successfully signed in with email:", email);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in with email:", error.code, error.message);
    throw error;
  }
}

/**
 * Create a new user with email and password
 * @param email User's email
 * @param password User's password
 * @returns Promise resolving to the user credentials
 */
export const createUserWithEmail = async (email: string, password: string) => {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase Auth is not initialized");

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Successfully created user with email:", email);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error creating user with email:", error.code, error.message);
    throw error;
  }
}

/**
 * Sign in with Google
 * @returns Promise resolving to the user credentials
 */
export const signInWithGoogle = async () => {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase Auth is not initialized");

  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log("Successfully signed in with Google");
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error.code, error.message);
    throw error;
  }
}

/**
 * Sign out the current user
 * @returns Promise that resolves when sign out is complete
 */
export const signOutUser = async () => {
  const auth = getAuth();
  if (!auth) throw new Error("Firebase Auth is not initialized");

  try {
    await signOut(auth);
    console.log("Successfully signed out");
  } catch (error: any) {
    console.error("Error signing out:", error.code, error.message);
    throw error;
  }
}

/**
 * Get the current authenticated user
 * @returns The current user or null if not authenticated
 */
export const getCurrentUser = () => {
  const auth = getAuth();
  return auth ? auth.currentUser : null;
}

/**
 * Subscribe to auth state changes
 * @param callback Function to call when auth state changes
 * @returns Unsubscribe function
 */
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  const auth = getAuth();
  if (!auth) {
    console.warn("Firebase Auth is not initialized, auth state changes won't be monitored");
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

export { User };
