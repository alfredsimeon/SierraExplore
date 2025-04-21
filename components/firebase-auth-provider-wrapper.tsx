"use client"

import React, { ReactNode } from "react"
import dynamic from "next/dynamic"

// Dynamically import FirebaseAuthProvider with no SSR
const DynamicFirebaseAuthProvider = dynamic(
  () => import("../contexts/firebase-auth-context").then(mod => mod.FirebaseAuthProvider),
  { ssr: false }
)

interface Props {
  children: ReactNode
}

export default function FirebaseAuthProviderWrapper({ children }: Props) {
  return <DynamicFirebaseAuthProvider>{children}</DynamicFirebaseAuthProvider>
}
