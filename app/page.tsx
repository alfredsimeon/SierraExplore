"use client"

import Link from "next/link"
import { Navigation } from "/components/navigation"
import { HeroCarousel } from "/components/hero-carousel"
import { locations } from "/lib/data/locations" // Updated import path

/**
 * Home Page Component
 *
 * This is the main landing page of the application.
 * It displays a hero carousel and featured destinations.
 *
 * Note: This component is a Server Component and doesn't directly use Firebase.
 * Authentication state is handled by client components like Navigation.
 */
export default function Home() {
  // Get the first 3 locations for featured destinations
  const featuredDestinations = locations.slice(0, 3)

  return (
    <main className="min-h-screen">
      <Navigation />

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Featured Destinations */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="p-6 rounded-lg card-overlay">
            <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">Featured Destinations</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredDestinations.map((destination) => (
                <div
                  key={destination.id}
                  className="overflow-hidden transition-transform rounded-lg shadow-lg hover:scale-105"
                >
                  <div className="relative h-64">
                    <img
                      src={destination.image || "/images/freetown.jpg"}
                      alt={destination.name}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = `/images/freetown.jpg?height=256&width=384&text=${encodeURIComponent(
                          destination.name,
                        )}`
                      }}
                    />
                  </div>
                  <div className="p-6 bg-white/90 dark:bg-gray-800/90">
                    <h3 className="text-xl font-semibold">{destination.name}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{destination.description}</p>
                    <Link
                      href={`/locations/${destination.id}`}
                      className="inline-block px-4 py-2 mt-4 text-sm font-medium text-white transition-colors bg-green-700 rounded-full hover:bg-green-800"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="p-6 rounded-lg card-overlay">
            <h2 className="mb-12 text-3xl font-bold text-center md:text-4xl">Unforgettable Experiences</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="overflow-hidden transition-transform rounded-lg shadow-lg hover:scale-105"
                >
                  <div className="relative h-48">
                    <img
                      src={experience.image || "/placeholder.svg"}
                      alt={experience.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // Fallback if image fails to load
                        const target = e.target as HTMLImageElement
                        target.src = `/placeholder.svg?height=192&width=384&text=${encodeURIComponent(
                          experience.title,
                        )}`
                      }}
                    />
                  </div>
                  <div className="p-4 bg-white/90 dark:bg-gray-800/90">
                    <h3 className="text-lg font-semibold">{experience.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{experience.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24">
        <div className="container px-4 mx-auto text-center">
          <div className="p-8 rounded-lg card-overlay">
            <h2 className="text-3xl font-bold md:text-4xl">Plan Your Adventure Today</h2>
            <p className="max-w-2xl mx-auto mt-4 text-lg">
              Let us help you create the perfect itinerary for your Sierra Leone adventure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/hotels"
                className="px-6 py-3 text-sm font-medium text-white transition-colors bg-green-700 rounded-full hover:bg-green-800"
              >
                Find Hotels
              </Link>
              <Link
                href="/car-rentals"
                className="px-6 py-3 text-sm font-medium text-white transition-colors bg-green-700 rounded-full hover:bg-green-800"
              >
                Rent a Car
              </Link>
              <Link
                href="/events"
                className="px-6 py-3 text-sm font-medium text-white transition-colors bg-green-700 rounded-full hover:bg-green-800"
              >
                Discover Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </main>
  )
}

// Sample data for the experiences section
const experiences = [
  {
    id: "1",
    title: "Beach Getaways",
    description: "Relax on Sierra Leone's pristine beaches with white sand and crystal-clear waters.",
    image: "/images/beachSL.jpg",
  },
  {
    id: "2",
    title: "Wildlife Safaris",
    description: "Encounter diverse wildlife in their natural habitats across Sierra Leone's national parks.",
    image: "/images/wildlife.jpg",
  },
  {
    id: "3",
    title: "Cultural Tours",
    description: "Immerse yourself in Sierra Leone's rich cultural heritage and traditions.",
    image: "/images/culturaltour.jpg",
  },
  {
    id: "4",
    title: "Adventure Activities",
    description: "Embark on thrilling adventures from hiking to water sports across the country.",
    image: "/images/adventureactivities.jpg",
  },
]
