"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "/components/ui/dialog"
import { MapPin, Clock, Tag, Info, Compass } from "lucide-react"
import { useToast } from "/components/ui/use-toast"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { Card, CardContent } from "/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "/components/ui/tabs"
import { addDays } from "date-fns"
import { locations } from "/lib/data/locations" // Updated import path

interface LocationDetailsProps {
  id: string
}

export function LocationDetails({ id }: LocationDetailsProps) {
  const [location, setLocation] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedTour, setSelectedTour] = useState<any>(null)
  const [participants, setParticipants] = useState(1)
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 1),
  })
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Find location by ID from static data
    const foundLocation = locations.find((l) => l.id === id)
    if (foundLocation) {
      setLocation(foundLocation)
    } else {
      toast({
        variant: "destructive",
        title: "Location not found",
        description: "The requested location could not be found.",
      })
      router.push("/locations")
    }
    setLoading(false)
  }, [id, router, toast])

  const handleBookTour = (tour?: any) => {
    if (tour) {
      setSelectedTour(tour)
    } else if (location?.tours && location.tours.length > 0) {
      setSelectedTour(location.tours[0])
    } else {
      setSelectedTour(null)
    }
    setIsBookingOpen(true)
  }

  const handleProceedToPayment = () => {
    if (!selectedTour) {
      toast({
        variant: "destructive",
        title: "Please select a tour",
        description: "You must select a tour to continue.",
      })
      return
    }

    // Calculate total price
    const totalPrice = selectedTour.price * participants

    // Navigate to payment page with booking details
    router.push(
      `/payment?type=tour&locationId=${location.id}&tourId=${selectedTour.id}&participants=${participants}&totalPrice=${totalPrice}`,
    )
  }

  if (loading || !location) {
    return <div className="flex items-center justify-center min-h-screen">Loading location details...</div>
  }

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg card-overlay">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">{location.name}</h1>
                <div className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  {location.region}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg h-80">
                  <Image
                    src={location.image || "/images/freetown.jpg"}
                    alt={location.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {location.images?.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="relative overflow-hidden rounded-lg h-36">
                    <Image
                      src={image || `/placeholder.svg?height=144&width=288&text=Image${index + 2}`}
                      alt={`${location.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <Tabs defaultValue="overview" className="mt-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="tours">Available Tours</TabsTrigger>
                  <TabsTrigger value="nearby">Nearby Attractions</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-4">
                  <h2 className="text-2xl font-semibold">About {location.name}</h2>
                  <div className="mt-4 space-y-4 text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {location.longDescription}
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-lg font-medium">Region</h3>
                      <p className="mt-2">{location.region}</p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-lg font-medium">Activities</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {location.activities.map((activity: string, index: number) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-700">
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="highlights" className="mt-4">
                  <h2 className="text-2xl font-semibold">Highlights</h2>
                  <ul className="mt-4 space-y-3">
                    {location.highlights.map((highlight: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <Tag className="w-5 h-5 mr-2 mt-0.5 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="tours" className="mt-4">
                  <h2 className="text-2xl font-semibold">Available Tours</h2>
                  <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {location.tours.map((tour: any) => (
                      <div key={tour.id} className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold">{tour.name}</h3>
                        <div className="flex items-center mt-2 text-sm">
                          <Clock className="w-4 h-4 mr-1 text-primary" />
                          <span>{tour.duration}</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{tour.description}</p>
                        <div className="mt-3">
                          <h4 className="text-sm font-medium">Includes:</h4>
                          <ul className="mt-1 text-sm space-y-1">
                            {tour.includes.map((item: string, index: number) => (
                              <li key={index} className="flex items-center">
                                <Compass className="w-3 h-3 mr-1 text-primary" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-lg font-bold">${tour.price}</span>
                          <span className="text-sm text-muted-foreground">per person</span>
                        </div>
                        <Button className="w-full mt-4" onClick={() => handleBookTour(tour)}>
                          Book This Tour
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="nearby" className="mt-4">
                  <h2 className="text-2xl font-semibold">Nearby Attractions</h2>
                  <ul className="mt-4 space-y-3">
                    {location.nearbyAttractions.map((attraction: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <MapPin className="w-5 h-5 mr-2 mt-0.5 text-primary" />
                        <span>{attraction}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky p-6 rounded-lg card-overlay top-20">
              <h2 className="text-xl font-semibold">Book a Tour</h2>

              <div className="p-4 mt-6 border rounded-md">
                <div className="flex items-center justify-between">
                  <span>Tours starting from:</span>
                  <span className="text-xl font-bold">
                    $
                    {location.tours && location.tours.length > 0
                      ? Math.min(...location.tours.map((t: any) => t.price))
                      : 0}
                  </span>
                </div>
                <Button className="w-full mt-4" onClick={() => handleBookTour()}>
                  View Available Tours
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium">Location Information</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex">
                    <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{location.region}, Sierra Leone</span>
                  </div>
                  <div className="flex">
                    <Info className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>Best time to visit: Year-round</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book a Tour to {location.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {location.tours && location.tours.length > 0 && !selectedTour && (
              <div className="space-y-4">
                <Label>Select a Tour</Label>
                <RadioGroup
                  defaultValue={location.tours[0].id}
                  className="space-y-3"
                  onValueChange={(value) => {
                    const tour = location.tours.find((t: any) => t.id === value)
                    setSelectedTour(tour)
                  }}
                >
                  {location.tours.map((tour: any) => (
                    <div key={tour.id} className="flex items-start space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value={tour.id} id={tour.id} className="mt-1" />
                      <div className="grid gap-1 w-full">
                        <Label htmlFor={tour.id} className="font-medium">
                          {tour.name} - ${tour.price}
                        </Label>
                        <p className="text-sm text-muted-foreground">{tour.description}</p>
                        <div className="text-xs text-muted-foreground mt-1">Duration: {tour.duration}</div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div className="space-y-2">
              <Label>Travel Dates</Label>
              <div className="border rounded-md p-3">
                <div className="grid gap-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-xs">Start Date</Label>
                      <Input
                        type="date"
                        value={dateRange.from.toISOString().split("T")[0]}
                        onChange={(e) => {
                          const newDate = new Date(e.target.value)
                          setDateRange({
                            ...dateRange,
                            from: newDate,
                          })
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">End Date</Label>
                      <Input
                        type="date"
                        value={dateRange.to ? dateRange.to.toISOString().split("T")[0] : ""}
                        onChange={(e) => {
                          const newDate = new Date(e.target.value)
                          setDateRange({
                            ...dateRange,
                            to: newDate,
                          })
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Number of Participants</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setParticipants(Math.max(1, participants - 1))}
                  disabled={participants <= 1}
                >
                  -
                </Button>
                <Input
                  id="participants"
                  type="number"
                  min="1"
                  max="10"
                  value={participants}
                  onChange={(e) => setParticipants(Number.parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setParticipants(Math.min(10, participants + 1))}
                  disabled={participants >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{selectedTour?.name || "Standard Tour"}</span>
                    <span>
                      ${selectedTour?.price || 0} x {participants}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(selectedTour?.price || 0) * participants}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProceedToPayment}>Proceed to Payment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
