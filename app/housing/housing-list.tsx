"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bed, Bath, MapPin, Home } from "lucide-react"
import { useFirebase } from "/contexts/firebase-context"

interface Housing {
  id: string
  title: string
  location: string
  price: number
  image: string
  bedrooms: number
  bathrooms: number
  area: number
  type: string
}

export function HousingList() {
  const [housing, setHousing] = useState<Housing[]>([])
  const [loading, setLoading] = useState(true)
  const { getDocuments, isReady } = useFirebase()

  useEffect(() => {
    async function fetchHousing() {
      try {
        if (!isReady) {
          // If Firestore is not ready yet, use sample data
          setHousing([
            {
              id: "1",
              title: "Modern Apartment in Aberdeen",
              location: "Aberdeen, Freetown",
              price: 1200,
              image: "/images/modernaberdeen.jpg",
              bedrooms: 3,
              bathrooms: 2,
              area: 1500,
              type: "Apartment",
            },
            {
              id: "2",
              title: "Beachfront Villa in Tokeh",
              location: "Tokeh Beach",
              price: 2500,
              image: "/images/beachvillatokeh.jpg",
              bedrooms: 4,
              bathrooms: 3,
              area: 2800,
              type: "Villa",
            },
            {
              id: "3",
              title: "Cozy House in Hill Station",
              location: "Hill Station, Freetown",
              price: 1800,
              image: "/images/cozyhillstation.jpg",
              bedrooms: 3,
              bathrooms: 2,
              area: 1800,
              type: "House",
            },
            {
              id: "4",
              title: "Luxury Apartment with Ocean View",
              location: "Lumley Beach, Freetown",
              price: 2200,
              image: "/images/luxuryapartmentocean.jpg",
              bedrooms: 2,
              bathrooms: 2,
              area: 1600,
              type: "Apartment",
            },
            {
              id: "5",
              title: "Family Home in Goderich",
              location: "Goderich, Freetown",
              price: 1500,
              image: "/images/familyhomegoderich.jpg",
              bedrooms: 4,
              bathrooms: 3,
              area: 2200,
              type: "House",
            },
            {
              id: "6",
              title: "Modern Townhouse in Wilberforce",
              location: "Wilberforce, Freetown",
              price: 1700,
              image: "/images/moderntownhouse.jpg",
              bedrooms: 3,
              bathrooms: 2.5,
              area: 1900,
              type: "Townhouse",
            },
          ])
          setLoading(false)
          return
        }

        const housingData = await getDocuments("housing")
        setHousing(housingData)
      } catch (error) {
        console.error("Error fetching housing:", error)
        // If error, use sample data
        setHousing([
          {
            id: "1",
            title: "Modern Apartment in Aberdeen",
            location: "Aberdeen, Freetown",
            price: 1200,
            image: "/images/housing-1.jpg",
            bedrooms: 3,
            bathrooms: 2,
            area: 1500,
            type: "Apartment",
          },
          {
            id: "2",
            title: "Beachfront Villa in Tokeh",
            location: "Tokeh Beach",
            price: 2500,
            image: "/images/housing-2.jpg",
            bedrooms: 4,
            bathrooms: 3,
            area: 2800,
            type: "Villa",
          },
          {
            id: "3",
            title: "Cozy House in Hill Station",
            location: "Hill Station, Freetown",
            price: 1800,
            image: "/images/housing-3.jpg",
            bedrooms: 3,
            bathrooms: 2,
            area: 1800,
            type: "House",
          },
          {
            id: "4",
            title: "Luxury Apartment with Ocean View",
            location: "Lumley Beach, Freetown",
            price: 2200,
            image: "/images/housing-4.jpg",
            bedrooms: 2,
            bathrooms: 2,
            area: 1600,
            type: "Apartment",
          },
          {
            id: "5",
            title: "Family Home in Goderich",
            location: "Goderich, Freetown",
            price: 1500,
            image: "/images/housing-5.jpg",
            bedrooms: 4,
            bathrooms: 3,
            area: 2200,
            type: "House",
          },
          {
            id: "6",
            title: "Modern Townhouse in Wilberforce",
            location: "Wilberforce, Freetown",
            price: 1700,
            image: "/images/housing-6.jpg",
            bedrooms: 3,
            bathrooms: 2.5,
            area: 1900,
            type: "Townhouse",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchHousing()
  }, [getDocuments, isReady])

  if (loading) {
    return <div className="text-center">Loading housing options...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {housing.map((house) => (
        <Link
          key={house.id}
          href={`/housing/${house.id}`}
          className="overflow-hidden transition-transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-[1.02]"
        >
          <div className="relative h-48">
            <Image
              src={house.image || "/placeholder.svg?height=192&width=384"}
              alt={house.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-semibold text-white bg-green-500 rounded-full">
              {house.type}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{house.title}</h3>
            <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{house.location}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Bed className="w-4 h-4 mr-2" />
                <span>{house.bedrooms} Beds</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Bath className="w-4 h-4 mr-2" />
                <span>{house.bathrooms} Baths</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Home className="w-4 h-4 mr-2" />
                <span>{house.area} ft²</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">${house.price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">per month</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
