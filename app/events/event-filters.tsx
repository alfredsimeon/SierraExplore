"use client"

import { useState } from "react"
import { Slider } from "/components/ui/slider"
import { Checkbox } from "/components/ui/checkbox"
import { Label } from "/components/ui/label"

export function EventFilters() {
  const [priceRange, setPriceRange] = useState([0, 100])

  const categories = ["Music", "Food", "Culture", "Sports", "Arts", "Adventure", "Business", "Education"]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <div className="p-4 space-y-6 bg-white rounded-lg shadow dark:bg-gray-800">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={0}
          max={200}
          step={5}
          onValueChange={(value) => setPriceRange(value as number[])}
        />
        <div className="flex items-center justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`category-${category}`} />
              <Label htmlFor={`category-${category}`}>{category}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Month</h3>
        <div className="grid grid-cols-2 gap-2">
          {months.map((month) => (
            <div key={month} className="flex items-center space-x-2">
              <Checkbox id={`month-${month}`} />
              <Label htmlFor={`month-${month}`}>{month}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
