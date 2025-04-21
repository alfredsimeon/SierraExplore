"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { FirebaseProvider } from "/contexts/firebase-context"
import { LoadingSpinner } from "/components/loading-spinner"

export function FirebaseClientProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return <FirebaseProvider>{children}</FirebaseProvider>
}
