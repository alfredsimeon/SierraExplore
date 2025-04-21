"use client"

import dynamic from "next/dynamic"
import { Suspense, useState, useEffect } from "react"
import { NavigationFallback } from "./navigation-fallback"

// Dynamically import the full Navigation component
const FullNavigation = dynamic(() => import("./navigation-full").then((mod) => mod.NavigationFull), {
  ssr: false,
  loading: () => <NavigationFallback />,
})

export function Navigation() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <NavigationFallback />
  }

  return (
    <Suspense fallback={<NavigationFallback />}>
      <FullNavigation />
    </Suspense>
  )
}
