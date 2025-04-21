"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  signInWithEmail,
  createUserWithEmail,
  signInWithGoogle,
  signOutUser,
  onAuthStateChange,
  getAuth,
  type User,
} from "lib/firebase-auth"; // Ensure this import is correct
import { firebaseApp } from "lib/firebase"; // Ensure this import is correct

/**
 * Firebase Auth Context Type
 */
interface FirebaseAuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<User>;
  signUp: (email: string, password: string) => Promise<User>;
  googleSignIn: () => Promise<User>;
  logout: () => Promise<void>;
}

// Create the context with default values
const FirebaseAuthContext = createContext<FirebaseAuthContextType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {
    throw new Error("Not implemented");
  },
  signUp: async () => {
    throw new Error("Not implemented");
  },
  googleSignIn: async () => {
    throw new Error("Not implemented");
  },
  logout: async () => {
    throw new Error("Not implemented");
  },
});

/**
 * Firebase Auth Provider Component
 *
 * Provides Firebase authentication state and methods to the application
 */
export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!isClient) return;

    let unsubscribe = () => {};

    const setupAuthListener = async () => {
      try {
        const auth = getAuth();
        if (!auth) {
          console.warn("Auth not initialized, skipping auth state listener");
          setLoading(false);
          return;
        }

        unsubscribe = onAuthStateChange((user) => {
          setUser(user);
          setLoading(false);
        });
      } catch (error) {
        console.error("Error setting up auth state listener:", error);
        setError(error as Error);
        setLoading(false);
      }
    };

    setupAuthListener();

    // Cleanup subscription
    return () => unsubscribe();
  }, [isClient]);

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string) => {
    try {
      const user = await signInWithEmail(email, password);
      setUser(user);
      setLoading(false);
      return user;
    } catch (error) {
      setError(error as Error);
      setLoading(false);
      throw error;
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string) => {
    try {
      const user = await createUserWithEmail(email, password);
      setUser(user);
      setLoading(false);
      return user;
    } catch (error) {
      setError(error as Error);
      setLoading(false);
      throw error;
    }
  };

  /**
   * Sign in with Google
   */
  const googleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      return user;
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    try {
      await signOutUser();
    } catch (error) {
      setError(error as Error);
      throw error;
    }
  };

  // Create the context value
  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    googleSignIn,
    logout,
  };

  return <FirebaseAuthContext.Provider value={value}>{children}</FirebaseAuthContext.Provider>;
}

/**
 * Hook to use the Firebase Auth context
 */
export function useFirebaseAuth() {
  return useContext(FirebaseAuthContext);
}
