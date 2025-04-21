"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar } from "/components/ui/calendar"
import { Button } from "/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "/components/ui/dialog"
import { BookingForm } from "/components/booking/booking-form"
import { Users, Fuel, Gauge, CalendarIcon } from "lucide-react"
import { useAuth } from "/hooks/use-auth"
import { useToast } from "/components/ui/use-toast"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { carRentals } from "../car-rental-list"

interface CarRentalDetailsProps {
  id: string
}

export function CarRentalDetails({ id }: CarRentalDetailsProps) {
  const [car, setCar] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  })
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Find car by ID from static data
    const foundCar = carRentals.find((c) => c.id === id)
    if (foundCar) {
      // Add additional images
      setCar({
        ...foundCar,
        images: [foundCar.image, "/images/car-interior.jpg", "/images/car-back.jpg", "/images/car-side.jpg"],
        features: [
          "Air Conditioning",
          "Bluetooth",
          "Backup Camera",
          "USB Ports",
          "Navigation System",
          "Cruise Control",
          "Keyless Entry",
        ],
      })
    }
    setLoading(false)
  }, [id])

  const handleBookCar = () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to book a car",
      })
      return
    }

    if (!date.to) {
      toast({
        variant: "destructive",
        title: "Date selection required",
        description: "Please select pickup and return dates",
      })
      return
    }

    setIsBookingOpen(true)
  }

  const handleBookingSuccess = () => {
    setIsBookingOpen(false)

    // Calculate rental days and total price
    const days = Math.ceil((date.to!.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
    const basePrice = car.price * days
    const insurance = Math.round(basePrice * 0.1)
    const taxes = Math.round(basePrice * 0.15)
    const totalPrice = basePrice + insurance + taxes

    router.push(
      `/payment?type=car&id=${id}&pickupDate=${date.from.toISOString()}&returnDate=${date.to?.toISOString()}&days=${days}&totalPrice=${totalPrice}`,
    )
  }

  if (loading || !car) {
    return <div className="flex items-center justify-center min-h-screen">Loading car rental details...</div>
  }

  const days = date.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const totalPrice = car.price * days
  const insurancePrice = Math.round(totalPrice * 0.1)
  const taxesPrice = Math.round(totalPrice * 0.15)
  const finalPrice = totalPrice + insurancePrice + taxesPrice

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg card-overlay">
              <h1 className="text-3xl font-bold">{car.name}</h1>
              <div className="inline-block px-3 py-1 mt-2 text-sm font-medium rounded-full bg-primary/10 text-primary">
                {car.type}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg h-80">
                  <Image
                    src={car.image || "/placeholder.svg?height=320&width=640"}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {car.images?.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="relative overflow-hidden rounded-lg h-36">
                    <Image
                      src={image || `/placeholder.svg?height=144&width=288&text=Image${index + 2}`}
                      alt={`${car.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">About this car</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{car.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8 sm:grid-cols-4">
                <div className="p-4 text-center border rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Seats</p>
                  <p className="font-medium">{car.seats}</p>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <CalendarIcon className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Transmission</p>
                  <p className="font-medium">{car.transmission}</p>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <Fuel className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Fuel Type</p>
                  <p className="font-medium">{car.fuelType}</p>
                </div>
                <div className="p-4 text-center border rounded-lg">
                  <Gauge className="w-6 h-6 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Mileage</p>
                  <p className="font-medium">{car.mileage}</p>
                </div>
              </div>

              {car.features && car.features.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Features</h2>
                  <div className="grid grid-cols-2 gap-2 mt-4 sm:grid-cols-3 md:grid-cols-4">
                    {car.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center p-2 border rounded-md">
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky p-6 rounded-lg card-overlay top-20">
              <h2 className="text-xl font-semibold">Rent This Car</h2>

              <div className="mt-4">
                <h3 className="mb-2 font-medium">Rental Period</h3>
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={(value: any) => setDate(value)}
                  className="border rounded-md"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="p-4 mt-6 border rounded-md">
                <div className="flex items-center justify-between">
                  <span>
                    ${car.price} x {days} days
                  </span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Insurance</span>
                  <span>${insurancePrice}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Taxes & fees</span>
                  <span>${taxesPrice}</span>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${finalPrice}</span>
                </div>
              </div>

              <Button className="w-full mt-6" size="lg" onClick={handleBookCar}>
                Rent Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Rent {car.name}</DialogTitle>
          </DialogHeader>
          <BookingForm
            itemName={car.name}
            itemType="car"
            price={finalPrice}
            startDate={date.from}
            endDate={date.to}
            additionalFields={
              <div className="space-y-4">
                <div className="p-4 mt-2 mb-2 border rounded-md bg-muted/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Pickup Date</p>
                      <p className="text-sm">{date.from.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Return Date</p>
                      <p className="text-sm">{date.to?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Car Type</p>
                      <p className="text-sm">{car.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Mileage</p>
                      <p className="text-sm">{car.mileage}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 border p-4 rounded-md">
                  <h3 className="font-medium">Driver's License Information</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="license-number">License Number</Label>
                      <Input id="license-number" placeholder="Enter license number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license-country">Issuing Country</Label>
                      <Input id="license-country" placeholder="Country" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="license-expiry">Expiry Date</Label>
                      <Input id="license-expiry" type="date" />
                    </div>
                  </div>
                </div>
              </div>
            }
            onSuccess={handleBookingSuccess}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
