import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  buttonText: string
  buttonLink: string
  backgroundImage: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  buttonText,
  buttonLink,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative flex flex-col justify-center h-full px-4 mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold tracking-widest text-green-500 uppercase">{subtitle}</h2>
          <h1 className="mt-2 text-4xl font-bold text-white sm:text-5xl md:text-6xl">{title}</h1>
          <p className="mt-4 text-lg text-gray-300">{description}</p>
          <div className="mt-8">
            <Link
              href={buttonLink}
              className="inline-flex items-center px-6 py-3 text-sm font-medium text-black bg-green-500 rounded-full hover:bg-green-600"
            >
              {buttonText}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
