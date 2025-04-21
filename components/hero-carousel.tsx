"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "/lib/utils"

const carouselImages = [
  {
    src: "/images/hero-deer.jpg",
    alt: "Wildlife in Sierra Leone",
    title: "Discover Wildlife",
    subtitle: "Experience Sierra Leone's natural beauty",
  },
  {
    src: "/images/beach-sunset.jpg",
    alt: "Beautiful beach sunset in Sierra Leone",
    title: "Pristine Beaches",
    subtitle: "Relax on Sierra Leone's stunning coastline",
  },
  {
    src: "/images/nightlife-event.jpg",
    alt: "Vibrant nightlife in Sierra Leone",
    title: "Vibrant Nightlife",
    subtitle: "Experience Sierra Leone's exciting entertainment",
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState<boolean[]>(Array(carouselImages.length).fill(false))

  // Auto-advance the carousel
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(goToNext, 5000)
    return () => clearInterval(interval)
  }, [goToNext])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleImageLoad = (index: number) => {
    const newLoadedState = [...isLoaded]
    newLoadedState[index] = true
    setIsLoaded(newLoadedState)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Carousel images */}
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0",
          )}
        >
          {!isLoaded[index] && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-green-500"></div>
            </div>
          )}
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            priority={index === 0}
            className={cn(
              "object-cover transition-opacity duration-500",
              isLoaded[index] ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => handleImageLoad(index)}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">{image.title}</h2>
            <p className="mt-2 text-lg text-gray-200 max-w-2xl">{image.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              index === currentIndex ? "bg-white" : "bg-white/50",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
