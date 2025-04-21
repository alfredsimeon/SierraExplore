"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, X, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "/lib/utils"
import { Button } from "/components/ui/button"

/**
 * Navigation Fallback Component
 *
 * A simplified version of the navigation component that doesn't depend on Firebase Auth
 * Used as a fallback when Firebase Auth is not initialized
 */
export function NavigationFallback() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Handle scroll event to change navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Navigation items
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Hotels", href: "/hotels" },
    { name: "Events", href: "/events" },
    { name: "Car Rentals", href: "/car-rentals" },
    { name: "Housing", href: "/housing" },
    { name: "Locations", href: "/locations" },
  ]

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled || isMobileMenuOpen || isSearchOpen ? "bg-black/80 backdrop-blur-sm" : "bg-transparent",
      )}
    >
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-white">SIERRA</span>
          <span className="text-xl font-bold text-green-500"> EXPLORE</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-white transition-colors hover:text-green-500"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button
            className="p-2 rounded-full hover:bg-white/10"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-white" />
          </button>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10 hover:text-white"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <Button
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-black"
              onClick={() => router.push("/signup")}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="p-2 md:hidden rounded-full hover:bg-white/10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="px-4 py-4 md:hidden bg-black/90">
          <div className="flex flex-col space-y-4">
            {/* Mobile Nav Links */}
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-white transition-colors hover:text-green-500 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="pt-2 mt-2 border-t border-white/10 flex flex-col space-y-2">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black w-full"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  router.push("/login")
                }}
              >
                Login
              </Button>
              <Button
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  router.push("/signup")
                }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
