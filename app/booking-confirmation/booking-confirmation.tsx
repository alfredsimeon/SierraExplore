"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "/components/ui/card"
import { Button } from "/components/ui/button"
import { CheckCircle } from "lucide-react"

export function BookingConfirmation() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [reference, setReference] = useState<string | null>(null)

  useEffect(() => {
    const ref = searchParams.get("reference")
    setReference(ref)
  }, [searchParams])

  return (
    <div className="container px-4 py-12 mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Booking Confirmed!</CardTitle>
          <CardDescription>
            Thank you for booking with Sierra Explore. Your reservation has been confirmed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border rounded-md bg-muted/20">
            <div className="flex justify-between">
              <span className="font-medium">Booking Reference:</span>
              <span>{reference || "N/A"}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-medium">Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="p-4 text-center bg-green-50 dark:bg-green-900/20 rounded-md">
            <p className="text-sm">
              A confirmation email has been sent to your registered email address with all the details of your booking.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => router.push("/")}>
            Return to Home
          </Button>
          <Button onClick={() => router.push("/dashboard?tab=bookings")}>View My Bookings</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
