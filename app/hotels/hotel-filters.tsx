"use client"

import { useState } from "react"
import { Slider } from "/components/ui/slider"
import { Checkbox } from "/components/ui/checkbox"
import { Label } from "/components/ui/label"

export function HotelFilters() {
  const [priceRange, setPriceRange] = useState([50, 500])

  const amenities = [
    "Pool",
    "Beach Access",
    "Free WiFi",
    "Restaurant",
    "Spa",
    "Gym",
    "Air Conditioning",
    "Room Service",
    "Airport Shuttle",
    "Bar",
  ]

  const locations = ["Freetown", "Tokeh Beach", "Banana Islands", "Bunce Island", "Bo", "Makeni", "Kenema"]

  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={1000}
          step={10}
          onValueChange={(value) => setPriceRange(value as number[])}
        />
        <div className="flex items-center justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Location</h3>
        <div className="space-y-2">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox id={`location-${location}`} />
              <Label htmlFor={`location-${location}`}>{location}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Amenities</h3>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox id={`amenity-${amenity}`} />
              <Label htmlFor={`amenity-${amenity}`}>{amenity}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
