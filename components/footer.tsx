"use client";

import { useState } from "react";
import Link from "next/link";

export function Footer() {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const adminEmail = "freehunter602@gmail.com";
  const adminPassword = "Simeon@24";

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setError("");
    if (email.trim().toLowerCase() === adminEmail && password === adminPassword) {
      // Redirect to admin dashboard
      window.location.href = "/admin";
    } else {
      setError("Invalid admin credentials");
    }
  };

  return (
    <>
      <footer className="py-12 text-white">
        <div className="container px-4 mx-auto">
          <div className="p-6 rounded-lg card-overlay">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div>
                <h3 className="mb-4 text-xl font-bold">SIERRA EXPLORE</h3>
                <p className="text-gray-300">Your gateway to discovering the beauty and culture of Sierra Leone.</p>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="text-gray-300 hover:text-white">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/locations" className="text-gray-300 hover:text-white">
                      Destinations
                    </Link>
                  </li>
                  <li>
                    <Link href="/hotels" className="text-gray-300 hover:text-white">
                      Hotels
                    </Link>
                  </li>
                  <li>
                    <Link href="/events" className="text-gray-300 hover:text-white">
                      Events
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowAdminLogin(true)}
                      className="text-gray-300 hover:text-white focus:outline-none"
                    >
                      Admin
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold">Contact</h4>
                <ul className="space-y-2 text-gray-300">
                  <li>Email: info@sierraexplore.com</li>
                  <li>Phone: +232 76 123456</li>
                  <li>Address: Freetown, Sierra Leone</li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white">
                    Facebook
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Twitter
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Instagram
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8 mt-8 text-center border-t border-gray-800">
              <p className="text-gray-300">© {new Date().getFullYear()} Sierra Explore. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {showAdminLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Admin Login</h2>
            {error && <p className="mb-4 text-red-600">{error}</p>}
            <form onSubmit={handleAdminLogin}>
              <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full mb-4 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="block mb-2 text-gray-700 dark:text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mb-4 px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowAdminLogin(false)}
                  className="mr-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-700 hover:bg-green-800 text-white"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
