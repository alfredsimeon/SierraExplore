"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "/components/ui/card"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { Separator } from "/components/ui/separator"
import { Button } from "/components/ui/button"
import { useToast } from "/components/ui/use-toast"
import { CreditCard, Smartphone } from "lucide-react"
import { events } from "/lib/data/events"
import { locations } from "/lib/data/locations"

export default function PaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get booking details from URL parameters
  const bookingType = searchParams.get("type")
  const totalPrice = Number.parseFloat(searchParams.get("totalPrice") || "0")

  // State for payment form
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [cardNumber, setCardNumber] = useState("")
  const [cardName, setCardName] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    // Get booking details based on type
    const getBookingDetails = () => {
      switch (bookingType) {
        case "event":
          const eventId = searchParams.get("eventId")
          const ticketType = searchParams.get("ticketType")
          const quantity = Number.parseInt(searchParams.get("quantity") || "1")

          const event = events.find((e) => e.id === eventId)
          if (event) {
            const ticket = event.ticketTypes?.find((t) => t.id === ticketType) || event.ticketTypes?.[0]
            return {
              title: event.name,
              subtitle: ticket ? `${ticket.name} x ${quantity}` : `Tickets x ${quantity}`,
              details: [
                { label: "Date", value: event.date },
                { label: "Time", value: event.time },
                { label: "Location", value: event.location },
              ],
            }
          }
          break

        case "tour":
          const locationId = searchParams.get("locationId")
          const tourId = searchParams.get("tourId")
          const participants = Number.parseInt(searchParams.get("participants") || "1")

          const location = locations.find((l) => l.id === locationId)
          if (location) {
            const tour = location.tours?.find((t) => t.id === tourId) || location.tours?.[0]
            return {
              title: location.name,
              subtitle: tour ? `${tour.name} x ${participants} participants` : `Tour x ${participants} participants`,
              details: [
                { label: "Duration", value: tour?.duration || "N/A" },
                { label: "Group Size", value: tour?.groupSize || "N/A" },
                { label: "Location", value: location.region },
              ],
            }
          }
          break

        // Add cases for hotel and car rental
        default:
          return {
            title: "Booking",
            subtitle: "Details not available",
            details: [],
          }
      }
    }

    setBookingDetails(getBookingDetails())
  }, [bookingType, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form based on payment method
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all card details.",
        })
        return
      }
    } else if (paymentMethod === "mobile") {
      if (!mobileNumber) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please enter your mobile number.",
        })
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Generate a random booking reference
      const bookingRef = Math.random().toString(36).substring(2, 10).toUpperCase()

      // Redirect to confirmation page
      router.push(`/booking-confirmation?ref=${bookingRef}&type=${bookingType}&amount=${totalPrice}`)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
      })
      setIsProcessing(false)
    }
  }

  if (!bookingDetails) {
    return <div className="flex items-center justify-center min-h-screen">Loading payment details...</div>
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Payment</CardTitle>
            <CardDescription>Secure payment for your booking</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6">
              {/* Booking Summary */}
              <div className="p-4 border rounded-lg">
                <h3 className="text-lg font-semibold">{bookingDetails.title}</h3>
                <p className="text-sm text-muted-foreground">{bookingDetails.subtitle}</p>

                <div className="mt-4 space-y-2">
                  {bookingDetails.details.map((detail: any, index: number) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{detail.label}:</span>
                      <span>{detail.value}</span>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold">
                  <span>Total Amount:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <h3 className="mb-3 text-lg font-medium">Payment Method</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2 font-normal cursor-pointer">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Card</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted mt-2">
                    <RadioGroupItem value="mobile" id="mobile" />
                    <Label htmlFor="mobile" className="flex items-center gap-2 font-normal cursor-pointer">
                      <Smartphone className="h-4 w-4" />
                      <span>Mobile Money</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Form */}
              <form onSubmit={handleSubmit}>
                {paymentMethod === "card" ? (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input
                        id="cardName"
                        placeholder="John Doe"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="mobileNumber">Mobile Number</Label>
                      <Input
                        id="mobileNumber"
                        placeholder="+232 76 123456"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You will receive a payment confirmation code on this number.
                    </p>
                  </div>
                )}

                <div className="flex justify-between mt-6">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Back
                  </Button>
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      `Pay $${totalPrice.toFixed(2)}`
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
