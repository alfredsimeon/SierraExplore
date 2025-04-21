"use client";

import { useState } from "react";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { useFirebaseAuth } from "contexts/firebase-auth-context";
import Link from "next/link";

/**
 * Signup Form Component
 *
 * Handles user registration with Google sign-in only
 */
interface SignupFormProps {
  onSuccess: () => void;
}

export function SignupForm({ onSuccess }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const { toast } = useToast();
  const { googleSignIn } = useFirebaseAuth();

  /**
   * Handle Google sign-in
   */
  async function handleGoogleSignIn() {
    setIsLoading(true);
    setAuthError(null);

    try {
      await googleSignIn();
      toast({
        title: "Signed in with Google",
        description: "Welcome to Sierra Explore!",
      });
      onSuccess();
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      setAuthError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4 py-2 pb-4">
      {authError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Sign Up Failed</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}

      <div className="text-center">
        <Button variant="outline" className="w-full mt-2" onClick={handleGoogleSignIn} disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up with Google"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
}
