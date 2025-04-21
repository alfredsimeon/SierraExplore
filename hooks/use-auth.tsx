"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useFirebase } from "/contexts/firebase-context"
import type { User } from "firebase/auth"

// Define the auth context type
interface AuthContextType {
  user: User | null
  loading: boolean
  error: Error | null
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null,
})

/**
 * Auth Provider Component
 *
 * This component provides authentication state to the application.
 * It wraps around the Firebase context to simplify access to auth state.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Get auth state from Firebase context
  const { currentUser, authLoading, authError } = useFirebase()

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        loading: authLoading,
        error: authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use authentication state
 *
 * This hook provides access to the current user, loading state, and any auth errors.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  console.log("useAuth hook - user:", context.user, "loading:", context.loading)
  return context
}
