"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error)
      setHasError(true)
      setError(error.error)
    }

    window.addEventListener("error", errorHandler)

    return () => {
      window.removeEventListener("error", errorHandler)
    }
  }, [])

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          We apologize for the inconvenience. Please try again later.
        </p>
        {error && (
          <pre className="p-4 mt-4 overflow-auto text-sm text-left bg-gray-100 rounded-md dark:bg-gray-800">
            {error.message}
          </pre>
        )}
        <Button
          className="mt-6"
          onClick={() => {
            setHasError(false)
            setError(null)
            window.location.reload()
          }}
        >
          Reload Page
        </Button>
      </div>
    )
  }

  return <>{children}</>
}
