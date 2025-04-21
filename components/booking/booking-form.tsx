"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Textarea } from "/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "/components/ui/form"
import { useToast } from "/components/ui/use-toast"
import { useAuth } from "/hooks/use-auth"
import { PaymentForm } from "/components/payment/payment-form"

const bookingSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
  specialRequests: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

interface BookingFormProps {
  itemName: string
  itemType: "hotel" | "car" | "event" | "housing" | "tour"
  price: number
  startDate?: Date
  endDate?: Date
  additionalFields?: React.ReactNode
  onSuccess: () => void
}

export function BookingForm({
  itemName,
  itemType,
  price,
  startDate,
  endDate,
  additionalFields,
  onSuccess,
}: BookingFormProps) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const { user } = useAuth()
  const { toast } = useToast()

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      country: "",
      specialRequests: "",
    },
  })

  function onSubmit(data: BookingFormValues) {
    // Move to payment step
    setStep("payment")
  }

  function handlePaymentSuccess() {
    toast({
      title: "Booking successful",
      description: `Your ${itemType} booking for ${itemName} has been confirmed.`,
    })
    onSuccess()
  }

  function handlePaymentCancel() {
    setStep("details")
  }

  return (
    <div className="space-y-6">
      {step === "details" ? (
        <>
          <div className="text-center">
            <h3 className="text-lg font-medium">Booking Details</h3>
            <p className="text-sm text-muted-foreground">
              Please fill in your details to book {itemType === "tour" ? "a tour to" : ""} {itemName}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john.doe@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 234 567 8900" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {additionalFields}

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special requests or requirements..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="rounded-lg border p-4 shadow-sm">
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span className="font-bold">${price.toFixed(2)}</span>
                </div>
                {startDate && endDate && (
                  <div className="mt-2 text-sm text-muted-foreground">
                    From {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full">
                Proceed to Payment
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <PaymentForm
          amount={price}
          itemName={itemName}
          onSuccess={handlePaymentSuccess}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  )
}
