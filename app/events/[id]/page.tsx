import { Suspense } from "react"
import { Navigation } from "/components/navigation"
import { EventDetails } from "./event-details"

export const metadata = {
  title: "Event Details - Sierra Explore",
  description: "View details and buy tickets for events in Sierra Leone.",
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <Suspense
          fallback={<div className="flex items-center justify-center min-h-screen">Loading event details...</div>}
        >
          <EventDetails id={params.id} />
        </Suspense>
      </div>
    </main>
  )
}
