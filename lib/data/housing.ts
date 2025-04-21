export interface Housing {
  id: string
  title: string
  location: string
  price: number
  image: string
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  description?: string
  features?: string[]
  rating?: number
}

export const housingList: Housing[] = [
  {
    id: "1",
    title: "Modern Apartment in Aberdeen",
    location: "Aberdeen, Freetown",
    price: 1200,
    image: "/images/modernaberdeen.jpg",
    bedrooms: 3,
    bathrooms: 2,
    area: 1500,
    type: "Apartment",
    description: "A modern apartment located in the heart of Aberdeen with all amenities.",
    features: ["WiFi", "Pool", "Gym"],
    rating: 4.5,
  },
  {
    id: "2",
    title: "Beachfront Villa in Tokeh",
    location: "Tokeh Beach",
    price: 2500,
    image: "/images/beachvillatokeh.jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: "Villa",
    description: "Luxurious beachfront villa with stunning ocean views.",
    features: ["WiFi", "Pool", "Parking"],
    rating: 4.8,
  },
  {
    id: "3",
    title: "Cozy House in Hill Station",
    location: "Hill Station, Freetown",
    price: 1800,
    image: "/images/cozyhillstation.jpg",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "House",
    description: "Cozy house in a quiet neighborhood with garden access.",
    features: ["WiFi", "Coffee", "Gym"],
    rating: 4.3,
  },
  {
    id: "4",
    title: "Luxury Apartment with Ocean View",
    location: "Lumley Beach, Freetown",
    price: 2200,
    image: "/images/luxuryapartmentocean.jpg",
    bedrooms: 2,
    bathrooms: 2,
    area: 1600,
    type: "Apartment",
    description: "Luxury apartment with panoramic ocean views and modern design.",
    features: ["WiFi", "Pool", "Restaurant"],
    rating: 4.7,
  },
  {
    id: "5",
    title: "Family Home in Goderich",
    location: "Goderich, Freetown",
    price: 1500,
    image: "/images/familyhomegoderich.jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: 2200,
    type: "House",
    description: "Spacious family home with large backyard and modern kitchen.",
    features: ["WiFi", "Parking", "Gym"],
    rating: 4.6,
  },
  {
    id: "6",
    title: "Modern Townhouse in Wilberforce",
    location: "Wilberforce, Freetown",
    price: 1700,
    image: "/images/moderntownhouse.jpg",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1900,
    type: "Townhouse",
    description: "Modern townhouse with open floor plan and private garage.",
    features: ["WiFi", "Pool", "Coffee"],
    rating: 4.4,
  },
]
