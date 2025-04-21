"use client"

import { useState } from "react"
import { Slider } from "/components/ui/slider"
import { Checkbox } from "/components/ui/checkbox"
import { Label } from "/components/ui/label"

export function CarRentalFilters() {
  const [priceRange, setPriceRange] = useState([30, 150])

  const carTypes = ["Sedan", "SUV", "Hatchback", "Minivan", "Pickup", "Luxury"]

  const transmissions = ["Automatic", "Manual"]

  const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"]

  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={300}
          step={5}
          onValueChange={(value) => setPriceRange(value as number[])}
        />
        <div className="flex items-center justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Car Type</h3>
        <div className="space-y-2">
          {carTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`type-${type}`} />
              <Label htmlFor={`type-${type}`}>{type}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Transmission</h3>
        <div className="space-y-2">
          {transmissions.map((transmission) => (
            <div key={transmission} className="flex items-center space-x-2">
              <Checkbox id={`transmission-${transmission}`} />
              <Label htmlFor={`transmission-${transmission}`}>{transmission}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Fuel Type</h3>
        <div className="space-y-2">
          {fuelTypes.map((fuelType) => (
            <div key={fuelType} className="flex items-center space-x-2">
              <Checkbox id={`fuel-${fuelType}`} />
              <Label htmlFor={`fuel-${fuelType}`}>{fuelType}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
