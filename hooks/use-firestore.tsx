"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { useFirebase } from "/contexts/firebase-context"
import type { Firestore } from "firebase/firestore"

interface FirestoreContextType {
  db: Firestore | null
  loading: boolean
}

const FirestoreContext = createContext<FirestoreContextType>({
  db: null,
  loading: true,
})

export function FirestoreProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true)
  const firebase = useFirebase()

  useEffect(() => {
    if (firebase.isReady) {
      setLoading(false)
    }
  }, [firebase.isReady])

  return <FirestoreContext.Provider value={{ db: firebase.db, loading }}>{children}</FirestoreContext.Provider>
}

export function useFirestore() {
  return useContext(FirestoreContext)
}
