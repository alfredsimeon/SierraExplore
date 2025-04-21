import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { CarRentalList } from "./car-rental-list"
import { CarRentalFilters } from "./car-rental-filters"

export const metadata = {
  title: "Car Rentals - Sierra Explore",
  description: "Rent a car for your Sierra Leone adventure.",
}

export default function CarRentalsPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <div
          className="relative h-[40vh] bg-cover bg-center"
          style={{ backgroundImage: "url('/images/car-rental-hero.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex flex-col items-center justify-center h-full px-4 text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Explore Sierra Leone Your Way</h1>
            <p className="max-w-2xl mt-4 text-lg text-gray-300">
              Rent a car and discover the beauty of Sierra Leone at your own pace
            </p>
          </div>
        </div>

        <div className="container px-4 py-12 mx-auto">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
              <CarRentalFilters />
            </div>
            <div className="md:col-span-3">
              <Suspense fallback={<div className="text-center">Loading car rentals...</div>}>
                <CarRentalList />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
