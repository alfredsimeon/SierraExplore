"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

/**
 * Props for the GoogleAuthButton component
 */
interface GoogleAuthButtonProps {
  type: "login" | "signup"
  className?: string
}

/**
 * Google Form URLs for authentication
 * Replace these with your actual Google Form URLs
 */
const GOOGLE_FORMS = {
  login: "https://forms.gle/YourLoginFormURL", // Replace with your login form URL
  signup: "https://forms.gle/YourSignupFormURL", // Replace with your signup form URL
}

/**
 * GoogleAuthButton component
 * Redirects users to Google Forms for authentication
 */
export function GoogleAuthButton({ type, className = "" }: GoogleAuthButtonProps) {
  const router = useRouter()
  const { toast } = useToast()

  /**
   * Handle button click to redirect to Google Form
   */
  const handleClick = () => {
    // Show toast notification
    toast({
      title: type === "login" ? "Redirecting to login form" : "Redirecting to signup form",
      description: "You will be redirected to Google Forms to complete the process.",
    })

    // Store the current URL in localStorage for redirect back
    localStorage.setItem("sierra-explore-redirect", window.location.href)

    // Redirect to Google Form
    window.location.href = GOOGLE_FORMS[type]
  }

  return (
    <Button onClick={handleClick} className={className} variant={type === "login" ? "default" : "outline"}>
      {type === "login" ? "Login with Google Form" : "Sign Up with Google Form"}
    </Button>
  )
}
