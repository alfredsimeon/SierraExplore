"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, MapPin } from "lucide-react"
import { LoadingSpinner } from "components/loading-spinner"

// Static hotel data
export const hotels = [
  {
    id: "1",
    name: "Radisson Blu Mammy Yoko Hotel",
    location: "Freetown",
    price: 250,
    rating: 4.7,
    image: "/images/radissonblu.jpg",
    amenities: ["Pool", "Spa", "Restaurant", "Free WiFi"],
    description:
      "Nestled on Lumley Beach, the Radisson Blu Mammy Yoko Hotel offers a luxurious retreat in Freetown. With stunning ocean views, modern amenities, and exceptional service, it's the perfect base for exploring Sierra Leone.",
  },
  {
    id: "2",
    name: "Tokeh Beach Resort",
    location: "Tokeh Beach",
    price: 180,
    rating: 4.5,
    image: "/images/tokehbeach.jpg",
    amenities: ["Beach Access", "Restaurant", "Bar", "Free WiFi"],
    description:
      "Experience beachfront luxury at Tokeh Beach Resort, where pristine sands meet comfortable accommodations. Enjoy ocean views, excellent dining, and a relaxing atmosphere.",
  },
  {
    id: "3",
    name: "Sierra Palms Resort",
    location: "Freetown",
    price: 150,
    rating: 4.3,
    image: "/images/sierrapalms.jpg",
    amenities: ["Pool", "Restaurant", "Free WiFi", "Airport Shuttle"],
    description:
      "Sierra Palms Resort offers a tranquil escape in the heart of Freetown. With lush gardens, a refreshing pool, and comfortable rooms, it's ideal for both business and leisure travelers.",
  },
  {
    id: "4",
    name: "Bintumani Hotel",
    location: "Freetown",
    price: 120,
    rating: 4.0,
    image: "/images/bintumanihotel.jpg",
    amenities: ["Restaurant", "Conference Room", "Free WiFi"],
    description:
      "Bintumani Hotel combines comfort with convenience in a central Freetown location. Enjoy city views, professional service, and easy access to local attractions.",
  },
  {
    id: "5",
    name: "The Place Resort",
    location: "Tokeh Beach",
    price: 200,
    rating: 4.6,
    image: "/images/theplaceresort.jpg",
    amenities: ["Beach Access", "Pool", "Restaurant", "Bar"],
    description:
      "The Place Resort offers an idyllic beachfront escape with modern amenities and traditional charm. Relax by the pool, dine on fresh seafood, and enjoy the natural beauty of Tokeh Beach.",
  },
  {
    id: "6",
    name: "Swiss Spirit Hotel & Suites Freetown",
    location: "Freetown",
    price: 220,
    rating: 4.4,
    image: "/images/swissspirit.jpg",
    amenities: ["Pool", "Gym", "Restaurant", "Business Center"],
    description:
      "Swiss Spirit Hotel & Suites offers international standards of luxury in the heart of Freetown. With spacious rooms, excellent dining options, and comprehensive business facilities, it caters to discerning travelers.",
  },
]

export function HotelList() {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map((hotel) => (
        <Link
          key={hotel.id}
          href={`/hotels/${hotel.id}`}
          className="overflow-hidden transition-transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-[1.02]"
        >
          <div className="relative h-48">
            <Image
              src={hotel.image || "/placeholder.svg?height=192&width=384"}
              alt={hotel.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{hotel.name}</h3>
              <div className="flex items-center">
                <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
                <span>{hotel.rating}</span>
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hotel.location}</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-700">
                  {amenity}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-700">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">${hotel.price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">per night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
