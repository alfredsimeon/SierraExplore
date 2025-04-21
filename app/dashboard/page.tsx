"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "/components/navigation"
import { useAuth } from "/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card"
import { Button } from "/components/ui/button"
import { LoadingSpinner } from "/components/loading-spinner"

/**
 * Dashboard Page
 *
 * This page displays user information and is protected.
 * It redirects unauthenticated users to the login page.
 */
export default function DashboardPage() {
  const { user, loading, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/")
    }
  }, [loading, isAuthenticated, router])

  // Show loading state
  if (loading) {
    return (
      <main>
        <Navigation />
        <div className="pt-16 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <LoadingSpinner size="lg" />
          <p className="ml-2">Loading dashboard...</p>
        </div>
      </main>
    )
  }

  // Show dashboard content for authenticated users
  return (
    <main>
      <Navigation />
      <div className="pt-16 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Welcome to Your Dashboard</CardTitle>
            <CardDescription>You are logged in as {user?.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p>{user?.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">User ID</p>
                <p>{user?.id}</p>
              </div>
              <Button
                variant="destructive"
                className="w-full mt-4"
                onClick={() => {
                  logout()
                  router.push("/")
                }}
              >
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
