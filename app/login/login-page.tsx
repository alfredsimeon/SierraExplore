"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card";
import { LoginForm } from "components/auth/login-form";
import { useFirebaseAuth } from "contexts/firebase-auth-context";
import { Alert, AlertDescription } from "components/ui/alert";

/**
 * LoginPage Client Component
 *
 * This component handles the login page logic including:
 * - Redirecting authenticated users
 * - Handling callback URLs
 * - Displaying loading states and errors
 */
export function LoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading, error } = useFirebaseAuth();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const adminEmail = "freehunter602@gmail.com";

  useEffect(() => {
    // Get the callback URL from the query parameters
    const callback = searchParams.get("callbackUrl");
    if (callback) {
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  useEffect(() => {
    // If user is already logged in, redirect admin to /admin, others to callbackUrl or /dashboard
    if (!loading && user) {
      if (user.email?.trim().toLowerCase() === adminEmail) {
        router.push("/admin");
      } else if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push("/dashboard");
      }
    }
  }, [user, loading, router, callbackUrl]);

  // Show nothing while loading or redirecting to avoid long loading screen
  if (loading || user) {
    return null;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Log in to your Sierra Explore account to access your bookings and more.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  There was a problem with the authentication service. Please try again later.
                </AlertDescription>
              </Alert>
            )}
            <LoginForm onSuccess={() => {}} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
