"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useFirebaseAuth } from "./firebase-auth-context"; // Import the new Firebase Auth context

/**
 * User interface representing authenticated user data
 */
interface User {
  uid: string; // Firebase user ID
  email: string;
  displayName?: string; // Optional display name
}

/**
 * Authentication context interface defining available methods and properties
 */
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: Error | null;
  login: (email: string, name: string) => Promise<void>; // Update to return a promise
  logout: () => Promise<void>; // Update to return a promise
  isAuthenticated: boolean;
}

/**
 * Default context values when no provider is present
 */
const defaultContext: AuthContextType = {
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: async () => {},
  isAuthenticated: false,
}

// Create the context
const AuthContext = createContext<AuthContextType>(defaultContext);

/**
 * AuthProvider component that manages authentication state
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, error, signIn, signOut } = useFirebaseAuth(); // Use the new Firebase Auth context

  /**
   * Login function to authenticate a user
   * @param email User's email address
   * @param name User's display name
   */
  const login = async (email: string, name: string) => {
    await signIn(email, name); // Call the signIn method from Firebase context
  }

  /**
   * Logout function to clear authentication state
   */
  const logout = async () => {
    await signOut(); // Call the signOut method from Firebase context
  }

  // Create the context value object
  const value: AuthContextType = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Custom hook to use the authentication context
 * @returns Authentication context with user state and methods
 */
export function useAuth() {
  return useContext(AuthContext);
}