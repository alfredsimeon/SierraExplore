"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { LoadingSpinner } from "/components/loading-spinner"

interface OptimizedImageProps extends Omit<ImageProps, "onError" | "onLoad"> {
  fallbackText?: string
}

export function OptimizedImage({ src, alt, fallbackText, className, ...props }: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Generate a fallback URL if the image fails to load
  const fallbackSrc = fallbackText
    ? `/placeholder.svg?height=${props.height || 300}&width=${props.width || 400}&text=${encodeURIComponent(fallbackText)}`
    : `/placeholder.svg?height=${props.height || 300}&width=${props.width || 400}`

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800">
          <LoadingSpinner size="md" />
        </div>
      )}

      <Image
        src={error ? fallbackSrc : src}
        alt={alt}
        className={className}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setError(true)
        }}
        {...props}
      />
    </div>
  )
}
