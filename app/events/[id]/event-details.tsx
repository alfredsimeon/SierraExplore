"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "/components/ui/dialog"
import { Calendar, Clock, MapPin, Users, Tag } from "lucide-react"
import { useToast } from "/components/ui/use-toast"
import { Input } from "/components/ui/input"
import { Label } from "/components/ui/label"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { Card, CardContent } from "/components/ui/card"
import { events } from "/lib/data/events"

interface EventDetailsProps {
  id: string
}

export function EventDetails({ id }: EventDetailsProps) {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    // Find event by ID from static data
    const foundEvent = events.find((e) => e.id === id)
    if (foundEvent) {
      setEvent(foundEvent)
    } else {
      toast({
        variant: "destructive",
        title: "Event not found",
        description: "The requested event could not be found.",
      })
      router.push("/events")
    }
    setLoading(false)
  }, [id, router, toast])

  const handleBuyTickets = (ticketType?: any) => {
    if (ticketType) {
      setSelectedTicket(ticketType)
    } else if (event?.ticketTypes && event.ticketTypes.length > 0) {
      setSelectedTicket(event.ticketTypes[0])
    } else {
      setSelectedTicket(null)
    }
    setIsBookingOpen(true)
  }

  const handleProceedToPayment = () => {
    if (!selectedTicket) {
      toast({
        variant: "destructive",
        title: "Please select a ticket type",
        description: "You must select a ticket type to continue.",
      })
      return
    }

    // Calculate total price
    const totalPrice = selectedTicket.price * ticketQuantity

    // Navigate to payment page with booking details
    router.push(
      `/payment?type=event&eventId=${event.id}&ticketType=${selectedTicket.id}&quantity=${ticketQuantity}&totalPrice=${totalPrice}`,
    )
  }

  if (loading || !event) {
    return <div className="flex items-center justify-center min-h-screen">Loading event details...</div>
  }

  return (
    <>
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-lg card-overlay">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-3xl font-bold">{event.name}</h1>
                <div className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                  {event.category}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-6">
                <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg h-80">
                  <Image
                    src={event.image || "/placeholder.svg?height=320&width=640"}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {event.images?.slice(1, 5).map((image: string, index: number) => (
                  <div key={index} className="relative overflow-hidden rounded-lg h-36">
                    <Image
                      src={image || `/placeholder.svg?height=144&width=288&text=Image${index + 2}`}
                      alt={`${event.name} - Image ${index + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-3">
                <div className="flex items-center p-4 border rounded-lg">
                  <Calendar className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{event.date}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <Clock className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">{event.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">About this event</h2>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{event.description}</p>
              </div>

              {event.organizer && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Organizer</h2>
                  <p className="mt-2">{event.organizer}</p>
                </div>
              )}

              {/* Event specific details */}
              {event.lineup && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Lineup</h2>
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {event.lineup.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.features && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Features</h2>
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {event.features.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.schedule && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Schedule</h2>
                  <ul className="mt-2 space-y-2">
                    {event.schedule.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.films && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Featured Films</h2>
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {event.films.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.requirements && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Requirements</h2>
                  <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                    {event.requirements.map((item: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <Tag className="w-4 h-4 mr-2 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {event.ticketTypes && event.ticketTypes.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-2xl font-semibold">Ticket Types</h2>
                  <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                    {event.ticketTypes.map((ticket: any) => (
                      <div key={ticket.id} className="p-4 border rounded-lg">
                        <h3 className="text-lg font-semibold">{ticket.name}</h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{ticket.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-lg font-bold">${ticket.price}</span>
                          <span className="text-sm text-muted-foreground">{ticket.available} available</span>
                        </div>
                        <Button className="w-full mt-4" onClick={() => handleBuyTickets(ticket)}>
                          Select
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky p-6 rounded-lg card-overlay top-20">
              <h2 className="text-xl font-semibold">Buy Tickets</h2>

              <div className="p-4 mt-6 border rounded-md">
                <div className="flex items-center justify-between">
                  <span>Starting from:</span>
                  <span className="text-xl font-bold">${event.price}</span>
                </div>
                <Button className="w-full mt-4" onClick={() => handleBuyTickets()}>
                  Buy Tickets
                </Button>
              </div>

              <div className="mt-6">
                <h3 className="font-medium">Event Details</h3>
                <div className="mt-2 space-y-2">
                  <div className="flex">
                    <Calendar className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex">
                    <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex">
                    <MapPin className="w-5 h-5 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Buy Tickets for {event.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {event.ticketTypes && event.ticketTypes.length > 0 && !selectedTicket && (
              <div className="space-y-4">
                <Label>Select Ticket Type</Label>
                <RadioGroup
                  defaultValue={event.ticketTypes[0].id}
                  className="space-y-3"
                  onValueChange={(value) => {
                    const ticket = event.ticketTypes.find((t: any) => t.id === value)
                    setSelectedTicket(ticket)
                  }}
                >
                  {event.ticketTypes.map((ticket: any) => (
                    <div key={ticket.id} className="flex items-start space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value={ticket.id} id={ticket.id} className="mt-1" />
                      <div className="grid gap-1 w-full">
                        <Label htmlFor={ticket.id} className="font-medium">
                          {ticket.name} - ${ticket.price}
                        </Label>
                        <p className="text-sm text-muted-foreground">{ticket.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="quantity">Number of Tickets</Label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                  disabled={ticketQuantity <= 1}
                >
                  -
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(Number.parseInt(e.target.value) || 1)}
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                  disabled={ticketQuantity >= 10}
                >
                  +
                </Button>
              </div>
            </div>

            <Card className="mt-4">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{selectedTicket?.name || "Standard Ticket"}</span>
                    <span>
                      ${selectedTicket?.price || event.price} x {ticketQuantity}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(selectedTicket?.price || event.price) * ticketQuantity}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => setIsBookingOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProceedToPayment}>Proceed to Payment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
