import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { LocationDetails } from "./location-details"

export const metadata = {
  title: "Location Details - Sierra Explore",
  description: "Discover the beauty of Sierra Leone's most amazing destinations.",
}

export default function LocationDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <Suspense
          fallback={<div className="flex items-center justify-center min-h-screen">Loading location details...</div>}
        >
          <LocationDetails id={params.id} />
        </Suspense>
      </div>
    </main>
  )
}
