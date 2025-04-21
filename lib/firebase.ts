/**
 * Firebase Configuration
 *
 * This file initializes Firebase services for client-side use.
 */

import { Analytics } from "firebase/analytics";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

// Your new Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfK7rIpPDdfCQacMskfkjyd4pUPnGs894",
  authDomain: "sierraexplore-e6b02.firebaseapp.com",
  projectId: "sierraexplore-e6b02",
  storageBucket: "sierraexplore-e6b02.firebasestorage.app",
  messagingSenderId: "695769984298",
  appId: "1:695769984298:web:f565a07099b61ba4424253",
  measurementId: "G-5DXWMS8BWW"
};

// Initialize Firebase only if it hasn't been initialized already
let firebaseApp: FirebaseApp | undefined;

// Lazy-loaded analytics instance
let analyticsInstance: Analytics | null = null;

// Initialize Firebase on the client side only
if (typeof window !== "undefined") {
  if (!getApps().length) {
    try {
      firebaseApp = initializeApp(firebaseConfig);
      console.log("Firebase initialized successfully");
    } catch (error) {
      console.error("Firebase initialization error:", error);
    }
  } else {
    firebaseApp = getApp();
  }
}

// Function to get Firebase Analytics instance
export const getAnalyticsInstance = async () => {
  if (!analyticsInstance && firebaseApp && typeof window !== "undefined") {
    try {
      const { getAnalytics } = await import("firebase/analytics");
      analyticsInstance = getAnalytics(firebaseApp);
      console.log("Firebase Analytics initialized successfully");
      return analyticsInstance;
    } catch (error) {
      console.error("Error initializing Firebase Analytics:", error);
      return null;
    }
  }
  return analyticsInstance;
}

// Function to get Firestore instance
export const getFirestore = async () => {
  if (!firebaseApp) return null;

  try {
    const { getFirestore: getFirestoreDb } = await import("firebase/firestore");
    return getFirestoreDb(firebaseApp);
  } catch (error) {
    console.error("Error initializing Firestore:", error);
    return null;
  }
}

export { firebaseApp };