"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface PlaceholderImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string
  alt: string
  fallbackText?: string
}

export function PlaceholderImage({ src, alt, fallbackText, ...props }: PlaceholderImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  // Generate a fallback URL
  const fallbackSrc = fallbackText
    ? `/placeholder.svg?height=${props.height || 300}&width=${props.width || 400}&text=${encodeURIComponent(fallbackText)}`
    : `/placeholder.svg?height=${props.height || 300}&width=${props.width || 400}`

  return (
    <div className={`relative ${isLoading ? "bg-gray-200 animate-pulse dark:bg-gray-700" : ""}`}>
      <Image
        {...props}
        src={imgSrc || "/placeholder.svg"}
        alt={alt}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc(fallbackSrc)
          setIsLoading(false)
        }}
      />
    </div>
  )
}
