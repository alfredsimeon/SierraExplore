import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { EventList } from "./event-list"
import { EventFilters } from "./event-filters"

export const metadata = {
  title: "Events - Sierra Explore",
  description: "Discover exciting events and activities in Sierra Leone.",
}

export default function EventsPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <div
          className="relative h-[40vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/event-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Discover Sierra Leone's Events</h1>
            <p className="max-w-2xl mt-4 text-lg text-gray-300">
              Experience the vibrant culture and exciting activities Sierra Leone has to offer
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <EventFilters />
            </div>
            <div className="md:col-span-3">
              <Suspense fallback={<div className="text-center">Loading events...</div>}>
                <EventList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
