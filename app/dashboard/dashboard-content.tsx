"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card"
import { Button } from "/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import { LoadingSpinner } from "/components/loading-spinner"
import { Package, User, Settings, LogOut } from "lucide-react"
import { useFirebaseAuth } from "/contexts/firebase-auth-context"

/**
 * Dashboard Content Component
 *
 * Displays user dashboard with tabs for bookings, profile, and settings
 */
export function DashboardContent() {
  const { user, loading, logout } = useFirebaseAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("bookings")

  useEffect(() => {
    if (!loading && !user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to access your dashboard",
      })
      router.push("/login")
    }
  }, [user, loading, router, toast])

  /**
   * Handle user logout
   */
  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
      toast({
        variant: "destructive",
        title: "Logout failed",
        description: "There was a problem logging you out. Please try again.",
      })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="p-6 rounded-lg card-overlay">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user.displayName || "Explorer"}</h1>
            <p className="mt-2 text-muted-foreground">Manage your bookings and account settings</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="bookings">
              <Package className="w-4 h-4 mr-2" />
              My Bookings
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>My Bookings</CardTitle>
                <CardDescription>View and manage your bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10">
                  <p className="text-muted-foreground">You don't have any bookings yet.</p>
                  <Button className="mt-4" onClick={() => router.push("/hotels")}>
                    Explore Hotels
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>View and update your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Name</p>
                    <p>{user.displayName || "Not set"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p>{user.email}</p>
                    {!user.emailVerified && (
                      <p className="text-sm text-yellow-500 mt-1">
                        Email not verified. Please check your inbox for verification email.
                      </p>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">Account Created</p>
                    <p>
                      {user.metadata.creationTime
                        ? new Date(user.metadata.creationTime).toLocaleDateString()
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account settings and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Email Notifications</p>
                    <p className="text-muted-foreground">Manage your email notification preferences</p>
                    <Button variant="outline" className="mt-2">
                      Manage Notifications
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Password</p>
                    <p className="text-muted-foreground">Change your password</p>
                    <Button variant="outline" className="mt-2">
                      Change Password
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Delete Account</p>
                    <p className="text-muted-foreground">Permanently delete your account and all data</p>
                    <Button variant="destructive" className="mt-2">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
