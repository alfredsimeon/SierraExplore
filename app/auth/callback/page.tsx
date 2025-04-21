"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "contexts/auth-context"; // Ensure this context is set up correctly
import { LoadingSpinner } from "components/loading-spinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card";
import { Button } from "components/ui/button";

/**
 * Authentication Callback Page
 *
 * This page handles the callback after a user completes the Google Form.
 * It processes URL parameters and authenticates the user.
 */
export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth(); // Ensure this function is compatible with the new auth methods
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Process authentication parameters from URL
    const processAuth = () => {
      try {
        // Get email and name from URL parameters
        const email = searchParams.get("email");
        const name = searchParams.get("name");

        // Validate parameters
        if (!email || !name) {
          setStatus("error");
          setErrorMessage("Missing required authentication information");
          return;
        }

        // Login the user
        login(email, name); // Ensure this is compatible with the new Firebase auth
        setStatus("success");

        // Redirect after a short delay
        setTimeout(() => {
          const redirectUrl = localStorage.getItem("sierra-explore-redirect") || "/dashboard";
          localStorage.removeItem("sierra-explore-redirect"); // Clean up
          router.push(redirectUrl);
        }, 2000);
      } catch (error) {
        console.error("Authentication callback error:", error);
        setStatus("error");
        setErrorMessage("Failed to process authentication");
      }
    };

    processAuth();
  }, [searchParams, login, router]);

  // Loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Processing Authentication</CardTitle>
            <CardDescription className="text-center">Please wait while we authenticate you...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <LoadingSpinner size="lg" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (status === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center text-red-500">Authentication Failed</CardTitle>
            <CardDescription className="text-center">{errorMessage}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button onClick={() => router.push("/")}>Return to Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Success state
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-green-500">Authentication Successful</CardTitle>
          <CardDescription className="text-center">You are now logged in!</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <p>Redirecting you...</p>
        </CardContent>
      </Card>
    </div>
  );
}