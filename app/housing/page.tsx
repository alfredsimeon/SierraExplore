import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { HousingList } from "./housing-list"
import { HousingFilters } from "./housing-filters"

export const metadata = {
  title: "Housing - Sierra Explore",
  description: "Find long-term accommodations in Sierra Leone.",
}

export default function HousingPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <div
          className="relative h-[40vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/housing-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Find Your Home in Sierra Leone</h1>
            <p className="max-w-2xl mt-4 text-lg text-gray-300">
              Discover apartments, houses, and villas for long-term stays
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <HousingFilters />
            </div>
            <div className="md:col-span-3">
              <Suspense fallback={<div className="text-center">Loading housing options...</div>}>
                <HousingList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
