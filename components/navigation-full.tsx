"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  User,
  LogOut,
  Home,
  Hotel,
  Calendar,
  Car,
  MapPin,
  Building,
  Settings,
  Package,
} from "lucide-react";
import { cn } from "../lib/utils"; // Correct import path
import { Button } from "../components/ui/button"; // Correct import path
import { useFirebaseAuth } from "../contexts/firebase-auth-context"; // Correct import path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"; // Correct import path
import { useToast } from "../components/ui/use-toast"; // Correct import path
import { Input } from "../components/ui/input"; // Correct import path
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"; // Correct import path

/**
 * Full Navigation Component
 *
 * Main navigation bar for the application with responsive design
 * and authentication-aware UI elements
 */
export function NavigationFull() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useFirebaseAuth(); // Use the Firebase Auth context
  const { toast } = useToast();

  // Handle scroll event to change navigation background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /**
   * Handle logout action
   */
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout method from Firebase context
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "There was a problem logging you out. Please try again.",
      });
    }
  }

  /**
   * Handle search form submission
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for "${searchQuery}"`,
      });
      setIsSearchOpen(false);
      setSearchQuery("");
      // Navigate to search results page
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Navigation items
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Hotels", href: "/hotels", icon: Hotel },
    { name: "Events", href: "/events", icon: Calendar },
    { name: "Car Rentals", href: "/car-rentals", icon: Car },
    { name: "Housing", href: "/housing", icon: Building },
    { name: "Locations", href: "/locations", icon: MapPin },
  ];

  // Get user initials for avatar
  const userInitials = user?.displayName
    ? user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <>
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
                className={cn(
                  "text-sm font-medium transition-colors hover:text-green-500",
                  pathname === item.href ? "text-green-500" : "text-white",
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Input */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
                <Input
                  type="search"
                  placeholder="Search destinations, hotels, events..."
                  className="pr-10 text-white bg-white/10 border-white/20 focus-visible:ring-green-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute inset-y-0 right-0 flex items-center px-3 text-white">
                  <Search className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                className="p-2 rounded-full hover:bg-white/10"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-white" />
              </button>
            )}

            {/* Close Search Button */}
            {isSearchOpen && (
              <button
                className="p-2 rounded-full hover:bg-white/10"
                onClick={() => setIsSearchOpen(false)}
                aria-label="Close search"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            )}

            {/* User Menu or Auth Buttons */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar>
                      <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                      <AvatarFallback className="bg-green-500 text-white">{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=bookings" className="flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      <span>My Bookings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard?tab=settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}

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
                  className={cn(
                    "flex items-center text-sm font-medium transition-colors hover:text-green-500 py-2",
                    pathname === item.href ? "text-green-500" : "text-white",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              {user ? (
                <>
                  <div className="pt-2 mt-2 border-t border-white/10">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
                        <AvatarFallback className="bg-green-500 text-white">{userInitials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-white">{user.displayName || "User"}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      className="flex items-center text-sm font-medium text-white hover:text-green-500 py-2"
                    >
                      <User className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-sm font-medium text-red-500 hover:text-red-400 py-2 mt-2"
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <div className="pt-2 mt-2 border-t border-white/10 flex flex-col space-y-2">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black w-full"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/login");
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push("/signup");
                    }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}