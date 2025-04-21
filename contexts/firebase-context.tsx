"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getFirestore, getAnalyticsInstance } from "/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
  setDoc as firestoreSetDoc,
  serverTimestamp,
  type Firestore,
} from "firebase/firestore"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence as setFirebasePersistence,
  updateProfile as updateFirebaseProfile,
  type User,
  type Auth,
} from "firebase/auth"
import { useToast } from "/components/ui/use-toast"
import { getAuth } from "/lib/firebase-auth"

// Define the Firebase context type with all available methods and properties
type FirebaseContextType = {
  // Firestore methods
  addDocument: (collectionName: string, data: any) => Promise<string>
  getDocuments: (collectionName: string) => Promise<any[]>
  getDocumentById: (collectionName: string, id: string) => Promise<any>
  queryDocuments: (collectionName: string, field: string, operator: any, value: any) => Promise<any[]>
  updateDocument: (collectionName: string, id: string, data: any) => Promise<void>
  deleteDocument: (collectionName: string, id: string) => Promise<void>

  // Authentication methods
  createUser: (email: string, password: string, name?: string) => Promise<User>
  signIn: (email: string, password: string) => Promise<User>
  signInWithGoogle: () => Promise<User>
  logout: () => Promise<void>
  sendPasswordReset: (email: string) => Promise<void>
  sendVerificationEmail: (user: User) => Promise<void>
  setPersistence: (rememberMe: boolean) => Promise<void>

  // State properties
  auth: Auth | null
  currentUser: User | null
  isReady: boolean
  db: Firestore | null
  authLoading: boolean
  authError: Error | null
}

// Create a default context with mock implementations
const defaultContext: FirebaseContextType = {
  // Default Firestore methods
  addDocument: async () => "",
  getDocuments: async () => [],
  getDocumentById: async () => null,
  queryDocuments: async () => [],
  updateDocument: async () => {},
  deleteDocument: async () => {},

  // Default Auth methods
  createUser: async () => {
    throw new Error("Auth not initialized")
  },
  signIn: async () => {
    throw new Error("Auth not initialized")
  },
  signInWithGoogle: async () => {
    throw new Error("Auth not initialized")
  },
  logout: async () => {},
  sendPasswordReset: async () => {},
  sendVerificationEmail: async () => {},
  setPersistence: async () => {},

  // Default state properties
  auth: null,
  currentUser: null,
  isReady: false,
  db: null,
  authLoading: true,
  authError: null,
}

// Create the Firebase context
const FirebaseContext = createContext<FirebaseContextType>(defaultContext)

// Custom hook to use the Firebase context
export const useFirebase = () => {
  return useContext(FirebaseContext)
}

// Firebase provider component
export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  // State for Firebase services
  const [db, setDb] = useState<Firestore | null>(null)
  const [authInstance, setAuthInstance] = useState<Auth | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState<Error | null>(null)
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Initialize Firebase services on the client side only
  useEffect(() => {
    if (!isClient) return

    const initFirebase = async () => {
      try {
        console.log("Initializing Firebase services...")

        // Initialize Auth first
        const auth = getAuth()
        console.log("Firebase Auth instance:", auth)
        setAuthInstance(auth)

        if (auth) {
          // Set up auth state listener
          const unsubscribe = auth.onAuthStateChanged(
            (user) => {
              console.log("Auth state changed:", user ? `User ${user.uid} (${user.email})` : "No user")
              setCurrentUser(user)
              setAuthLoading(false)
            },
            (error) => {
              console.error("Auth state change error:", error)
              setAuthError(error as Error)
              setAuthLoading(false)
            },
          )

          // Return cleanup function
          return () => unsubscribe()
        }

        // Initialize Firestore
        const firestoreInstance = await getFirestore()
        setDb(firestoreInstance)

        // Initialize Analytics (optional)
        await getAnalyticsInstance()

        // Set ready state when at least one service is initialized
        if (firestoreInstance || auth) {
          console.log("Firebase services initialized successfully")
          setIsReady(true)
        }
      } catch (error) {
        console.error("Error initializing Firebase:", error)
        setAuthError(error as Error)
        toast({
          variant: "destructive",
          title: "Firebase Initialization Error",
          description: "There was a problem connecting to our services. Please try again later.",
        })
        // Even if there's an error, we'll set isReady to true so the app can continue with fallback data
        setIsReady(true)
        setAuthLoading(false)
      }
    }

    // Only run on client side
    initFirebase()
  }, [isClient, toast])

  // Firestore functions with fallbacks
  const addDocument = async (collectionName: string, data: any) => {
    if (!db) {
      console.warn("Firestore is not initialized, operation will be mocked")
      return `mock-id-${Date.now()}`
    }
    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      })
      return docRef.id
    } catch (error) {
      console.error("Error adding document:", error)
      throw error
    }
  }

  const getDocuments = async (collectionName: string) => {
    if (!db) {
      console.warn("Firestore is not initialized, returning empty array")
      return []
    }
    try {
      const querySnapshot = await getDocs(collection(db, collectionName))
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error getting documents:", error)
      return []
    }
  }

  const getDocumentById = async (collectionName: string, id: string) => {
    if (!db) {
      console.warn("Firestore is not initialized, returning null")
      return null
    }
    try {
      const docRef = doc(db, collectionName, id)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() }
      } else {
        return null
      }
    } catch (error) {
      console.error("Error getting document:", error)
      return null
    }
  }

  const queryDocuments = async (collectionName: string, field: string, operator: any, value: any) => {
    if (!db) {
      console.warn("Firestore is not initialized, returning empty array")
      return []
    }
    try {
      const q = query(collection(db, collectionName), where(field, operator, value))
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    } catch (error) {
      console.error("Error querying documents:", error)
      return []
    }
  }

  const updateDocument = async (collectionName: string, id: string, data: any) => {
    if (!db) {
      console.warn("Firestore is not initialized, operation will be mocked")
      return
    }
    try {
      const docRef = doc(db, collectionName, id)
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
    } catch (error) {
      console.error("Error updating document:", error)
      throw error
    }
  }

  const deleteDocument = async (collectionName: string, id: string) => {
    if (!db) {
      console.warn("Firestore is not initialized, operation will be mocked")
      return
    }
    try {
      const docRef = doc(db, collectionName, id)
      await deleteDoc(docRef)
    } catch (error) {
      console.error("Error deleting document:", error)
      throw error
    }
  }

  // Set persistence based on remember me option
  const setPersistence = async (rememberMe: boolean) => {
    if (!authInstance) {
      console.warn("Auth is not initialized, cannot set persistence")
      return
    }

    try {
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence
      await setFirebasePersistence(authInstance, persistenceType)
      console.log(`Persistence set to ${rememberMe ? "LOCAL" : "SESSION"}`)
    } catch (error) {
      console.error("Error setting persistence:", error)
      // Don't throw, just log the error
    }
  }

  // Auth functions with fallbacks
  const createUser = async (email: string, password: string, name?: string) => {
    if (!authInstance) {
      console.error("Auth is not initialized")
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Authentication service is not available. Please try again later.",
      })
      throw new Error("Auth is not initialized")
    }

    try {
      console.log("Creating user with email:", email)
      const userCredential = await createUserWithEmailAndPassword(authInstance, email, password)
      const user = userCredential.user

      // Update display name if provided
      if (name && user) {
        try {
          await updateFirebaseProfile(user, { displayName: name })
        } catch (error) {
          console.error("Error updating user profile:", error)
        }
      }

      // Send verification email
      try {
        await sendEmailVerification(user)
      } catch (error) {
        console.error("Error sending verification email:", error)
      }

      // Store user in Firestore if db is available
      if (db) {
        try {
          await firestoreSetDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            email: user.email,
            displayName: name || null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            emailVerified: user.emailVerified,
          })
        } catch (error) {
          console.error("Error storing user in Firestore:", error)
        }
      }

      return user
    } catch (error: any) {
      console.error("Error creating user:", error)
      let errorMessage = "Failed to create account. Please try again."

      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already in use. Please try logging in instead."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please check and try again."
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak. Please use a stronger password."
      }

      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: errorMessage,
      })

      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    if (!authInstance) {
      console.error("Auth is not initialized")
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Authentication service is not available. Please try again later.",
      })
      throw new Error("Auth is not initialized")
    }

    try {
      console.log("Signing in user with email:", email)
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password)

      // Update last login time in Firestore
      if (db && userCredential.user) {
        try {
          await updateDoc(doc(db, "users", userCredential.user.uid), {
            lastLogin: serverTimestamp(),
          })
        } catch (error) {
          console.error("Error updating last login time:", error)
        }
      }

      return userCredential.user
    } catch (error: any) {
      console.error("Error signing in:", error)
      let errorMessage = "Failed to sign in. Please check your credentials and try again."

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        errorMessage = "Invalid email or password. Please try again."
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please check and try again."
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled. Please contact support."
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many unsuccessful login attempts. Please try again later."
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
      })

      throw error
    }
  }

  const signInWithGoogle = async () => {
    if (!authInstance) {
      console.error("Auth is not initialized")
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Authentication service is not available. Please try again later.",
      })
      throw new Error("Auth is not initialized")
    }

    try {
      console.log("Signing in with Google")
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(authInstance, provider)
      const user = userCredential.user

      // Store user in Firestore if db is available
      if (db && user) {
        try {
          await firestoreSetDoc(
            doc(db, "users", user.uid),
            {
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
              lastLogin: serverTimestamp(),
              updatedAt: serverTimestamp(),
              emailVerified: user.emailVerified,
            },
            { merge: true },
          )
        } catch (error) {
          console.error("Error storing Google user in Firestore:", error)
        }
      }

      return user
    } catch (error: any) {
      console.error("Error signing in with Google:", error)
      let errorMessage = "Failed to sign in with Google. Please try again."

      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup was closed before completing the sign in."
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Sign-in popup was blocked by your browser. Please allow popups for this site."
      }

      toast({
        variant: "destructive",
        title: "Google Sign In Failed",
        description: errorMessage,
      })

      throw error
    }
  }

  const logout = async () => {
    if (!authInstance) {
      console.warn("Auth is not initialized")
      return
    }
    try {
      console.log("Logging out user")
      await signOut(authInstance)
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      })
    } catch (error) {
      console.error("Error signing out:", error)
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
      })
      throw error
    }
  }

  const sendPasswordReset = async (email: string) => {
    if (!authInstance) {
      console.error("Auth is not initialized")
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Authentication service is not available. Please try again later.",
      })
      throw new Error("Auth is not initialized")
    }

    try {
      console.log("Sending password reset email to:", email)
      await sendPasswordResetEmail(authInstance, email)
    } catch (error: any) {
      console.error("Error sending password reset:", error)
      let errorMessage = "Failed to send password reset email. Please try again."

      if (error.code === "auth/user-not-found") {
        // For security reasons, don't reveal that the user doesn't exist
        // Just pretend it worked
        return
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address. Please check and try again."
      }

      toast({
        variant: "destructive",
        title: "Password Reset Failed",
        description: errorMessage,
      })

      throw error
    }
  }

  const sendVerificationEmail = async (user: User) => {
    try {
      console.log("Sending verification email to user:", user.email)
      await sendEmailVerification(user)
    } catch (error: any) {
      console.error("Error sending verification email:", error)
      let errorMessage = "Failed to send verification email. Please try again later."

      if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again later."
      }

      toast({
        variant: "destructive",
        title: "Verification Email Failed",
        description: errorMessage,
      })

      throw error
    }
  }

  // Create the context value object with all methods and properties
  const value: FirebaseContextType = {
    addDocument,
    getDocuments,
    getDocumentById,
    queryDocuments,
    updateDocument,
    deleteDocument,
    createUser,
    signIn,
    signInWithGoogle,
    logout,
    sendPasswordReset,
    sendVerificationEmail,
    setPersistence,
    auth: authInstance,
    currentUser,
    isReady,
    db,
    authLoading,
    authError,
  }

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
}

// Helper function to set a document with specific ID
async function setDoc(docRef: any, data: any, options?: any) {
  try {
    if (options?.merge) {
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
    } else {
      // Check if document exists
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp(),
        })
      } else {
        // Create a new document with custom ID
        await firestoreSetDoc(docRef, {
          ...data,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        })
      }
    }
  } catch (error) {
    console.error("Error in setDoc:", error)
    throw error
  }
}
