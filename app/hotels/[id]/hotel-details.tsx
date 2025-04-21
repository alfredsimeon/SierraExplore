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
import { hotels } from "../hotel-list"

interface HotelDetailsProps {
  id: string
}

// Room data for each hotel
export const hotelRooms = {
  "1": [
    {
      id: "room1",
      type: "Standard Room",
      price: 250,
      capacity: 2,
      description:
        "Comfortable room with a king-size bed or twin beds, featuring modern amenities and a view of the city.",
      image: "/images/standardroom1.jpg",
    },
    {
      id: "room2",
      type: "Deluxe Ocean View",
      price: 350,
      capacity: 2,
      description: "Spacious room with a king-size bed, private balcony, and stunning views of the Atlantic Ocean.",
      image: "/images/deluxeocean.jpg",
    },
    {
      id: "room3",
      type: "Executive Suite",
      price: 450,
      capacity: 3,
      description:
        "Luxurious suite with a separate living area, king-size bed, and premium amenities for the discerning traveler.",
      image: "/images/executivesuite.jpg",
    },
  ],
  "2": [
    {
      id: "room1",
      type: "Beach View Room",
      price: 180,
      capacity: 2,
      description: "Cozy room with direct views of Tokeh Beach, featuring a queen-size bed and modern amenities.",
      image: "/images/tokehbeachview.jpg",
    },
    {
      id: "room2",
      type: "Deluxe Suite",
      price: 280,
      capacity: 3,
      description:
        "Spacious suite with separate living area, king-size bed, and private balcony overlooking the ocean.",
      image: "/images/tokehdeluxesuite.jpg",
    },
  ],
  "3": [
    {
      id: "room1",
      type: "Garden Room",
      price: 150,
      capacity: 2,
      description: "Peaceful room with garden views, featuring a queen-size bed and modern amenities.",
      image: "/images/sierragarden.jpg",
    },
    {
      id: "room2",
      type: "Pool View Suite",
      price: 220,
      capacity: 2,
      description: "Elegant suite with views of the pool area, featuring a king-size bed and sitting area.",
      image: "/images/sierrapoolview.jpg",
    },
  ],
  "4": [
    {
      id: "room1",
      type: "Standard Room",
      price: 120,
      capacity: 2,
      description: "Comfortable room with city views, featuring twin beds or a queen-size bed.",
      image: "/images/bintumanistandard.jpg",
    },
    {
      id: "room2",
      type: "Business Suite",
      price: 180,
      capacity: 2,
      description: "Functional suite with work desk, king-size bed, and additional amenities for business travelers.",
      image: "/images/bintumanibusiness.jpg",
    },
  ],
  "5": [
    {
      id: "room1",
      type: "Beach Bungalow",
      price: 200,
      capacity: 2,
      description: "Private bungalow steps from the beach, featuring a queen-size bed and outdoor seating area.",
      image: "/images/beach-sunset.jpg",
    },
    {
      id: "room2",
      type: "Luxury Villa",
      price: 350,
      capacity: 4,
      description: "Spacious villa with two bedrooms, private terrace, and direct beach access.",
      image: "/images/sierrapoolview.jpg",
    },
  ],
  "6": [
    {
      id: "room1",
      type: "Superior Room",
      price: 220,
      capacity: 2,
      description: "Modern room with city views, featuring a king-size bed and elegant furnishings.",
      image: "/images/bintumanistandard.jpg",
    },
    {
      id: "room2",
      type: "Executive Suite",
      price: 320,
      capacity: 2,
      description: "Luxurious suite with separate living area, king-size bed, and premium amenities.",
      image: "/images/bintumanibusiness.jpg",
    },
  ],
}

export function HotelDetails({ id }: HotelDetailsProps) {
  const [hotel, setHotel] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState<{ from: Date; to: Date | undefined }>({
    from: new Date(),
    to: undefined,
  })
  const [guests, setGuests] = useState(1)
  const [selectedRoom, setSelectedRoom] = useState<any>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Find hotel by ID from static data
    const foundHotel = hotels.find((h) => h.id === id)
    if (foundHotel) {
      // Add rooms to the hotel data
      setHotel({
        ...foundHotel,
        images: [
          foundHotel.image,
          "/images/hotel-pool.jpg",
          "/images/hotel-restaurant.jpg",
          "/images/hotel-lobby.jpg",
          "/images/hotel-exterior.jpg",
        ],
        rooms: hotelRooms[id as keyof typeof hotelRooms] || [],
      })
    }
    setLoading(false)
  }, [id])

  const handleBookRoom = (room: any) => {
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
    setIsBookingOpen(false)
    router.push(
      "/payment?type=hotel&id=" +
        id +
        "&roomId=" +
        selectedRoom.id +
        "&checkIn=" +
        date.from.toISOString() +
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

  if (loading || !hotel) {
    return <div className="flex items-center justify-center min-h-screen">Loading hotel details...</div>
  }

  const nights = date.to ? Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24)) : 1
  const taxRate = 0.15 // 15% tax rate

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg card-overlay">
              <h1 className="text-3xl font-bold">{hotel.name}</h1>

              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-1 text-yellow-500 fill-yellow-500" />
                  <span>{hotel.rating} (124 reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-1" />
                  <span>{hotel.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg h-80">
                  <Image
                    src={hotel.images[0] || "/placeholder.svg?height=320&width=640"}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {hotel.images.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="relative overflow-hidden rounded-lg h-36">
                    <Image
                      src={image || `/placeholder.svg?height=144&width=288&text=Image${index + 2}`}
                      alt={`${hotel.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">About this hotel</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{hotel.description}</p>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">Amenities</h2>
                <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 md:grid-cols-4">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">Available Rooms</h2>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                  {hotel.rooms.map((room: any) => (
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
                          <span className="text-sm text-gray-500">per night</span>
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
                  onSelect={(value: any) => setDate(value)}
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
                    ${hotel.price} x {nights} nights
                  </span>
                  <span>${hotel.price * nights}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span>Taxes & fees</span>
                  <span>${Math.round(hotel.price * taxRate * nights)}</span>
                </div>
                <div className="flex items-center justify-between pt-4 mt-4 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    ${hotel.price * nights + Math.round(hotel.price * taxRate * nights)}
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

                  if (hotel.rooms.length > 0) {
                    handleBookRoom(hotel.rooms[0])
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
              itemName={`${hotel.name} - ${selectedRoom.type}`}
              itemType="hotel"
              price={selectedRoom.price * nights + Math.round(selectedRoom.price * taxRate * nights)}
              startDate={date.from}
              endDate={date.to}
              additionalFields={
                <div className="p-4 mt-2 mb-2 border rounded-md bg-muted/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <p className="text-sm">{date.from.toLocaleDateString()}</p>
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
