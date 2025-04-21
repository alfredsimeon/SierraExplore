"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { useFirebase } from "/contexts/firebase-context"
import { Button } from "/components/ui/button"

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  price: number
  image: string
  category: string
}

export function EventList() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const { getDocuments, isReady } = useFirebase()

  useEffect(() => {
    async function fetchEvents() {
      try {
        if (!isReady) {
          // If Firestore is not ready yet, use sample data
          setEvents([
            {
              id: "1",
              name: "Sierra Leone Music Festival",
              date: "June 15, 2024",
              time: "4:00 PM - 11:00 PM",
              location: "National Stadium, Freetown",
              price: 50,
              image: "/images/freetown.jpg",
              category: "Music",
            },
            {
              id: "2",
              name: "Freetown Food Festival",
              date: "July 8, 2024",
              time: "12:00 PM - 8:00 PM",
              location: "Lumley Beach, Freetown",
              price: 25,
              image: "/images/freetownfood.jpg",
              category: "Food",
            },
            {
              id: "3",
              name: "Cultural Heritage Exhibition",
              date: "August 20, 2024",
              time: "10:00 AM - 6:00 PM",
              location: "National Museum, Freetown",
              price: 15,
              image: "/images/CulturalHeritageExhibition.jpg",
              category: "Culture",
            },
            {
              id: "4",
              name: "Beach Volleyball Tournament",
              date: "September 5, 2024",
              time: "9:00 AM - 5:00 PM",
              location: "River No. 2 Beach",
              price: 10,
              image: "/images/BeachVolleyballTournament.jpg",
              category: "Sports",
            },
            {
              id: "5",
              name: "Sierra Leone Film Festival",
              date: "October 12, 2024",
              time: "3:00 PM - 10:00 PM",
              location: "Freetown Cinema, Freetown",
              price: 30,
              image: "/images/SierraLeoneFilmFestival.jpg",
              category: "Arts",
            },
            {
              id: "6",
              name: "Hiking Adventure: Mount Bintumani",
              date: "November 8, 2024",
              time: "7:00 AM - 6:00 PM",
              location: "Mount Bintumani, Northern Province",
              price: 75,
              image: "/images/MountBintumani.jpg",
              category: "Adventure",
            },
          ])
          setLoading(false)
          return
        }

        const eventsData = await getDocuments("events")
        setEvents(eventsData)
      } catch (error) {
        console.error("Error fetching events:", error)
        // If error, use sample data
        setEvents([
          {
            id: "1",
            name: "Sierra Leone Music Festival",
            date: "June 15, 2024",
            time: "4:00 PM - 11:00 PM",
            location: "National Stadium, Freetown",
            price: 50,
            image: "/images/event-1.jpg",
            category: "Music",
          },
          {
            id: "2",
            name: "Freetown Food Festival",
            date: "July 8, 2024",
            time: "12:00 PM - 8:00 PM",
            location: "Lumley Beach, Freetown",
            price: 25,
            image: "/images/event-2.jpg",
            category: "Food",
          },
          {
            id: "3",
            name: "Cultural Heritage Exhibition",
            date: "August 20, 2024",
            time: "10:00 AM - 6:00 PM",
            location: "National Museum, Freetown",
            price: 15,
            image: "/images/event-3.jpg",
            category: "Culture",
          },
          {
            id: "4",
            name: "Beach Volleyball Tournament",
            date: "September 5, 2024",
            time: "9:00 AM - 5:00 PM",
            location: "River No. 2 Beach",
            price: 10,
            image: "/images/event-4.jpg",
            category: "Sports",
          },
          {
            id: "5",
            name: "Sierra Leone Film Festival",
            date: "October 12, 2024",
            time: "3:00 PM - 10:00 PM",
            location: "Freetown Cinema, Freetown",
            price: 30,
            image: "/images/event-5.jpg",
            category: "Arts",
          },
          {
            id: "6",
            name: "Hiking Adventure: Mount Bintumani",
            date: "November 8, 2024",
            time: "7:00 AM - 6:00 PM",
            location: "Mount Bintumani, Northern Province",
            price: 75,
            image: "/images/event-6.jpg",
            category: "Adventure",
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [getDocuments, isReady])

  if (loading) {
    return <div className="text-center">Loading events...</div>
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <div
          key={event.id}
          className="overflow-hidden transition-transform bg-white rounded-lg shadow-lg dark:bg-gray-800 hover:scale-[1.02]"
        >
          <div className="relative h-48">
            <Image
              src={event.image || "/placeholder.svg?height=192&width=384"}
              alt={event.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-0 right-0 px-3 py-1 m-2 text-xs font-semibold text-white bg-green-500 rounded-full">
              {event.category}
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{event.name}</h3>

            <div className="grid gap-2 mt-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-bold">${event.price}</span>
              <Link href={`/events/${event.id}`}>
                <Button>Buy Tickets</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
