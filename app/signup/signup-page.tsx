"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card";
import { SignupForm } from "components/auth/signup-form";
import { useFirebaseAuth } from "contexts/firebase-auth-context";
import { Alert, AlertDescription } from "components/ui/alert";

/**
 * SignupPage Client Component
 *
 * This component handles the signup page logic including:
 * - Redirecting authenticated users
 * - Displaying loading states and errors
 */
export function SignupPage() {
  const router = useRouter();
  const { user, loading, error } = useFirebaseAuth();

  useEffect(() => {
    // If user is already logged in, immediately redirect to dashboard
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  // Show nothing while loading or redirecting to avoid long loading screen
  if (loading || user) {
    return null;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
            <CardDescription className="text-center">
              Sign up for Sierra Explore to book hotels, events, and more.
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
            <SignupForm onSuccess={() => {}} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SignupPage;
