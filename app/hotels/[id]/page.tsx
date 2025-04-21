import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { HotelDetails } from "./hotel-details"

export const metadata = {
  title: "Hotel Details - Sierra Explore",
  description: "View details and book your perfect hotel in Sierra Leone.",
}

export default function HotelDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <Suspense
          fallback={<div className="flex items-center justify-center min-h-screen">Loading hotel details...</div>}
        >
          <HotelDetails id={params.id} />
        </Suspense>
      </div>
    </main>
  )
}
