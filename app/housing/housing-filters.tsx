"use client"

import { useState } from "react"
import { Slider } from "/components/ui/slider"
import { Checkbox } from "/components/ui/checkbox"
import { Label } from "/components/ui/label"

export function HousingFilters() {
  const [priceRange, setPriceRange] = useState([500, 3000])
  const [bedroomsRange, setBedroomsRange] = useState([1, 5])

  const propertyTypes = ["Apartment", "House", "Villa", "Townhouse", "Studio", "Condo"]

  const locations = ["Freetown", "Aberdeen", "Lumley Beach", "Hill Station", "Wilberforce", "Goderich", "Tokeh Beach"]

  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range (Monthly)</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={5000}
          step={100}
          onValueChange={(value) => setPriceRange(value as number[])}
        />
        <div className="flex items-center justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Bedrooms</h3>
        <Slider
          defaultValue={bedroomsRange}
          min={1}
          max={6}
          step={1}
          onValueChange={(value) => setBedroomsRange(value as number[])}
        />
        <div className="flex items-center justify-between mt-2">
          <span>{bedroomsRange[0]} Bed</span>
          <span>{bedroomsRange[1]} Beds</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Property Type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <Label htmlFor={`type-${type}`}>{type}</Label>
            </div>
          ))}
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
    </div>
  )
}
