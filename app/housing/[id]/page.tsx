"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Calendar } from "/components/ui/calendar"
import { Button } from "/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "/components/ui/dialog"
import { BookingForm } from "/components/booking/booking-form"
import { Star, MapPin, Wifi, Coffee, Utensils, Car, PocketIcon as Pool, Dumbbell } from "lucide-react"
import { useAuth } from "/hooks/use-auth"
import { useToast } from "/components/ui/use-toast"
import { Housing, housingList } from "/lib/data/housing"
import type { DateRange as DayPickerDateRange } from "react-day-picker"

interface Room {
  id: string
  type: string
  price: number
  capacity: number
  description: string
  image: string
}

interface House extends Housing {
  rooms: Room[]
  images?: string[]
}

export const housingRooms: Record<string, Room[]> = {
  "1": [
    {
      id: "room1",
      type: "Master Bedroom",
      price: 1200,
      capacity: 2,
      description: "Spacious master bedroom with ensuite bathroom and balcony.",
      image: "/images/housing-1.jpg",
    },
    {
      id: "room2",
      type: "Guest Room",
      price: 800,
      capacity: 2,
      description: "Cozy guest room with garden view.",
      image: "/images/housing-2.jpg",
    },
  ],
  "2": [
    {
      id: "room1",
      type: "Villa Suite",
      price: 2500,
      capacity: 4,
      description: "Luxurious villa suite with private pool access.",
      image: "/images/housing-3.jpg",
    },
  ],
  "3": [
    {
      id: "room1",
      type: "Cozy Bedroom",
      price: 900,
      capacity: 2,
      description: "Comfortable bedroom with modern amenities.",
      image: "/images/housing-4.jpg",
    },
  ],
  // Add more as needed
}

export default function HousingDetails({ params }: { params: { id: string } }) {
  const id = params.id
  const [house, setHouse] = useState<House | null>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<DayPickerDateRange>({
    from: new Date(),
    to: undefined,
  })
  const [guests, setGuests] = useState<number>(1)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Find house by ID from static data
    const foundHouse = housingList.find((h) => h.id === id)
    if (foundHouse) {
      const mappedHouse: House = {
        ...foundHouse,
        rooms: housingRooms[id] || [],
        images: [
          foundHouse.image,
          "/images/housing-1.jpg",
          "/images/housing-2.jpg",
          "/images/housing-3.jpg",
          "/images/housing-4.jpg",
        ],
      }
      setHouse(mappedHouse)
    }
    setLoading(false)
  }, [id])

  const handleBookRoom = (room: Room) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to book a room",
      })
      return
    }

    if (!date.to) {
      toast({
        variant: "destructive",
        title: "Date selection required",
        description: "Please select check-in and check-out dates",
      })
      return
    }

    setSelectedRoom(room)
    setIsBookingOpen(true)
  }

  const handleBookingSuccess = () => {
    if (!selectedRoom) return
    setIsBookingOpen(false)
    router.push(
      "/payment?type=housing&id=" +
        id +
        "&roomId=" +
        selectedRoom.id +
        "&checkIn=" +
        date.from!.toISOString() +
        "&checkOut=" +
        (date.to?.toISOString() || "") +
        "&guests=" +
        guests,
    )
  }

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes("wifi")) return <Wifi className="w-5 h-5" />
    if (amenityLower.includes("pool")) return <Pool className="w-5 h-5" />
    if (amenityLower.includes("restaurant")) return <Utensils className="w-5 h-5" />
    if (amenityLower.includes("coffee")) return <Coffee className="w-5 h-5" />
    if (amenityLower.includes("shuttle") || amenityLower.includes("parking")) return <Car className="w-5 h-5" />
    if (amenityLower.includes("gym") || amenityLower.includes("fitness")) return <Dumbbell className="w-5 h-5" />
    return null
  }

  if (loading || !house) {
    return <div className="flex items-center justify-center min-h-screen">Loading housing details...</div>
  }

  const nights = date.to ? Math.ceil((date.to.getTime() - date.from!.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const taxRate = 0.15 // 15% tax rate

  const images = house.images ?? []

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg card-overlay">
              <h1 className="text-3xl font-bold">{house.title}</h1>

              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{house.rating || "4.5"} (124 reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{house.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg h-80">
                  <Image
                    src={images[0] || "/placeholder.svg?height=320&width=640"}
                    alt={house.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="relative overflow-hidden rounded-lg h-36">
                    <Image
                      src={image || `/placeholder.svg?height=144&width=288&text=Image${index + 2}`}
                      alt={`${house.title} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">About this house</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{house.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">Features</h2>
                <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                  {house.features?.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      {getAmenityIcon(feature)}
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">Available Rooms</h2>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                  {house.rooms.map((room: Room) => (
                    <div key={room.id} className="overflow-hidden border rounded-lg shadow-sm dark:border-gray-700">
                      <div className="relative h-48">
                        <Image
                          src={room.image || `/placeholder.svg?height=192&width=384&text=${room.type}`}
                          alt={room.type}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold">{room.type}</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{room.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-lg font-bold">${room.price}</span>
                          <span className="text-sm text-gray-500">per month</span>
                        </div>
                        <Button className="w-full mt-4" onClick={() => handleBookRoom(room)}>
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky p-6 rounded-lg card-overlay top-20">
              <h2 className="text-xl font-semibold">Book Your Stay</h2>

              <div className="mt-4">
                <h3 className="mb-2 font-medium">Dates</h3>
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={(value) => {
                    if (value === undefined || value.from === undefined) {
                      setDate({ from: new Date(), to: undefined })
                    } else {
                      setDate(value)
                    }
                  }}
                  className="border rounded-md"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="mt-4">
                <h3 className="mb-2 font-medium">Guests</h3>
                <div className="flex items-center justify-between p-2 border rounded-md">
                  <span>Adults</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </Button>
                    <span>{guests}</span>
                    <Button variant="outline" size="sm" onClick={() => setGuests(guests + 1)}>
                      +
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-4 mt-6 border rounded-md">
                <div className="flex items-center justify-between">
                  <span>
                    ${house.price} x {nights} nights
                  </span>
                  <span>${house.price * nights}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Taxes & fees</span>
                  <span>${Math.round(house.price * taxRate * nights)}</span>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${house.price * nights + Math.round(house.price * taxRate * nights)}
                  </span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={() => {
                  if (!user) {
                    toast({
                      variant: "destructive",
                      title: "Authentication required",
                      description: "Please log in to book a room",
                    })
                    return
                  }

                  if (!date.to) {
                    toast({
                      variant: "destructive",
                      title: "Date selection required",
                      description: "Please select check-in and check-out dates",
                    })
                    return
                  }

                  if (house.rooms.length > 0) {
                    handleBookRoom(house.rooms[0])
                  }
                }}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Book {selectedRoom?.type}</DialogTitle>
          </DialogHeader>
          {selectedRoom && (
            <BookingForm
              itemName={`${house.title} - ${selectedRoom.type}`}
              itemType="housing"
              price={selectedRoom.price * nights + Math.round(selectedRoom.price * taxRate * nights)}
              startDate={date.from!}
              endDate={date.to}
              additionalFields={
                <div className="p-4 mt-2 mb-2 border rounded-md bg-muted/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm">{date.from!.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <p className="text-sm">{date.to?.toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Guests</p>
                      <p className="text-sm">{guests} Adults</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Room Type</p>
                      <p className="text-sm">{selectedRoom.type}</p>
                    </div>
                  </div>
                </div>
              }
              onSuccess={handleBookingSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
