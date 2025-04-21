import { BookingConfirmation } from "./booking-confirmation"
import { Navigation } from "/components/navigation"

export const metadata = {
  title: "Booking Confirmation - Sierra Explore",
  description: "Your booking has been confirmed",
}

export default function ConfirmationPage() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <BookingConfirmation />
      </div>
    </main>
  )
}
