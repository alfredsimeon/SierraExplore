"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { locations } from "/lib/data/locations" // Updated import path
import { Button } from "/components/ui/button"

export function LocationList() {
  const [loading, setLoading] = useState(false)

  if (loading) {
    return <div className="text-center">Loading locations...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <div
          key={location.id}
          className="overflow-hidden transition-transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-[1.02]"
        >
          <div className="relative h-64">
            <Image
              src={location.image || "/placeholder.svg?height=256&width=384"}
              alt={location.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-semibold text-white bg-green-500 rounded-full">
              {location.region}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-semibold">{location.name}</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{location.description}</p>

            <div className="flex flex-wrap gap-2 mt-4">
              {location.activities.map((activity, index) => (
                <span key={index} className="px-3 py-1 text-xs bg-gray-100 rounded-full dark:bg-gray-700">
                  {activity}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <Link href={`/locations/${location.id}`}>
                <Button className="w-full">Explore</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
