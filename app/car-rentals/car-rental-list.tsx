"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Users, Fuel, Gauge, Calendar } from "lucide-react"
import { LoadingSpinner } from "/components/loading-spinner"

// Static car rental data
export const carRentals = [
  {
    id: "1",
    name: "Toyota RAV4",
    type: "SUV",
    price: 75,
    image: "/images/toyotarav4.jpg",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    mileage: "Unlimited",
    description:
      "The Toyota RAV4 is a versatile and reliable SUV, perfect for exploring Sierra Leone's diverse landscapes. With its comfortable interior, fuel efficiency, and ample cargo space, it's an ideal choice for both city driving and adventures to remote areas.",
  },
  {
    id: "2",
    name: "Honda Civic",
    type: "Sedan",
    price: 60,
    image: "/images/hondacivic.jpg",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    mileage: "Unlimited",
    description:
      "The Honda Civic offers excellent fuel economy and a comfortable ride, making it perfect for city exploration and coastal drives. Its reliability and modern features ensure a pleasant journey throughout Sierra Leone.",
  },
  {
    id: "3",
    name: "Toyota Land Cruiser",
    type: "SUV",
    price: 120,
    image: "/images/toyotalandcruiser.jpg",
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    mileage: "Unlimited",
    description:
      "The Toyota Land Cruiser is the ultimate vehicle for exploring Sierra Leone's rugged terrain. With its powerful engine, four-wheel drive, and spacious interior, it can handle any adventure while providing comfort and reliability.",
  },
  {
    id: "4",
    name: "Nissan X-Trail",
    type: "SUV",
    price: 85,
    image: "/images/nissanxtrail.jpg",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    mileage: "Unlimited",
    description:
      "The Nissan X-Trail combines comfort with capability, offering a smooth ride on paved roads and confidence on rougher terrain. Its spacious interior and modern features make it ideal for families exploring Sierra Leone.",
  },
  {
    id: "5",
    name: "Toyota Corolla",
    type: "Sedan",
    price: 55,
    image: "/images/toyotacorolla.jpg",
    seats: 5,
    transmission: "Automatic",
    fuelType: "Petrol",
    mileage: "Unlimited",
    description:
      "The Toyota Corolla is a reliable and fuel-efficient sedan perfect for urban exploration in Freetown and comfortable highway driving. Its proven reliability makes it an excellent choice for hassle-free travel in Sierra Leone.",
  },
  {
    id: "6",
    name: "Mitsubishi Pajero",
    type: "SUV",
    price: 100,
    image: "/images/mitsubishipajero.jpg",
    seats: 7,
    transmission: "Automatic",
    fuelType: "Diesel",
    mileage: "Unlimited",
    description:
      "The Mitsubishi Pajero is a rugged and capable SUV with excellent off-road capabilities, perfect for adventurous travelers looking to explore Sierra Leone's remote areas and challenging terrain while enjoying comfort and reliability.",
  },
]

export function CarRentalList() {
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
      {carRentals.map((car) => (
        <Link
          key={car.id}
          href={`/car-rentals/${car.id}`}
          className="overflow-hidden transition-transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-[1.02]"
        >
          <div className="relative h-48">
            <Image
              src={car.image || "/placeholder.svg?height=192&width=384"}
              alt={car.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{car.name}</h3>
              <span className="px-2 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-700">{car.type}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-2" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Fuel className="w-4 h-4 mr-2" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Gauge className="w-4 h-4 mr-2" />
                <span>{car.mileage}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">${car.price}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">per day</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
