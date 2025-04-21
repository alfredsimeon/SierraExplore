import type React from "react"
import FirebaseAuthProviderWrapper from "../components/firebase-auth-provider-wrapper"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "../components/theme-provider"
import { ErrorBoundary } from "../components/error-boundary"
import { Toaster } from "../components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

/**
 * Root Layout
 *
 * This is the main layout component for the application.
 * It wraps all pages with necessary providers:
 * - ThemeProvider: For dark/light mode
 * - FirebaseAuthProvider: For authentication state
 * - ErrorBoundary: For error handling
 * - Toaster: For toast notifications
 */
export const metadata = {
  title: "Sierra Explore - Discover Sierra Leone",
  description:
    "Discover the hidden gems of Sierra Leone, from pristine beaches along the Atlantic coast to lush rainforests teeming with wildlife.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <FirebaseAuthProviderWrapper>
            <ErrorBoundary>{children}</ErrorBoundary>
            <Toaster />
          </FirebaseAuthProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  )
}
