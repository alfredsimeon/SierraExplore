import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { CarRentalDetails } from "./car-rental-details"

export const metadata = {
  title: "Car Rental Details - Sierra Explore",
  description: "View details and book your perfect car rental in Sierra Leone.",
}

export default function CarRentalDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <Suspense
          fallback={<div className="flex items-center justify-center min-h-screen">Loading car rental details...</div>}
        >
          <CarRentalDetails id={params.id} />
        </Suspense>
      </div>
    </main>
  )
}
