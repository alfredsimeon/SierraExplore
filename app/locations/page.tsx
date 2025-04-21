import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { LocationList } from "./location-list"

export const metadata = {
  title: "Locations - Sierra Explore",
  description: "Discover the most beautiful locations in Sierra Leone.",
}

export default function LocationsPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <div
          className="relative h-[40vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/locations-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Explore Sierra Leone</h1>
            <p className="max-w-2xl mt-4 text-lg text-gray-300">
              Discover the hidden gems and breathtaking landscapes of Sierra Leone
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <Suspense fallback={<div className="text-center">Loading locations...</div>}>
            <LocationList />
          </Suspense>
        </div>
      </div>
    </main>
  )
}
