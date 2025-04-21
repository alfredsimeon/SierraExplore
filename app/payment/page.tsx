import { Navigation } from "/components/navigation"
import  PaymentPage  from "./payment-page"

export const metadata = {
  title: "Payment - Sierra Explore",
  description: "Complete your booking payment for Sierra Explore services.",
}

export default function Payment() {
  return (
    <main>
      <Navigation />
      <div className="pt-16">
        <PaymentPage />
      </div>
    </main>
  )
}
