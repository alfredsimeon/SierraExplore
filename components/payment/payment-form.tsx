"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "/components/ui/button"
import { Input } from "/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "/components/ui/form"
import { RadioGroup, RadioGroupItem } from "/components/ui/radio-group"
import { useToast } from "/components/ui/use-toast"
import { CreditCard, ShoppingCartIcon as Paypal, Smartphone } from "lucide-react"
import { useAuth } from "/hooks/use-auth"

const paymentSchema = z.object({
  paymentMethod: z.enum(["card", "paypal", "googlepay"]),
  cardNumber: z.string().optional(),
  cardName: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
})

type PaymentFormValues = z.infer<typeof paymentSchema>

interface PaymentFormProps {
  amount: number
  itemName: string
  onSuccess: () => void
  onCancel: () => void
}

export function PaymentForm({ amount, itemName, onSuccess, onCancel }: PaymentFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: "card",
    },
  })

  const watchPaymentMethod = form.watch("paymentMethod")

  async function onSubmit(data: PaymentFormValues) {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to complete your payment",
      })
      return
    }

    setIsProcessing(true)
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Payment successful",
        description: `Your payment of $${amount.toFixed(2)} for ${itemName} has been processed.`,
      })
      onSuccess()
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Payment failed",
        description: error.message || "An error occurred during payment processing",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium">Payment Details</h3>
        <p className="text-sm text-muted-foreground">Complete your payment for {itemName}</p>
      </div>

      <div className="rounded-lg border p-4 shadow-sm">
        <div className="flex justify-between">
          <span>Total Amount:</span>
          <span className="font-bold">${amount.toFixed(2)}</span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                      <RadioGroupItem value="card" id="card" />
                      <label htmlFor="card" className="flex items-center gap-2 font-normal">
                        <CreditCard className="h-4 w-4" />
                        <span>Credit/Debit Card</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <label htmlFor="paypal" className="flex items-center gap-2 font-normal">
                        <Paypal className="h-4 w-4" />
                        <span>PayPal</span>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                      <RadioGroupItem value="googlepay" id="googlepay" />
                      <label htmlFor="googlepay" className="flex items-center gap-2 font-normal">
                        <Smartphone className="h-4 w-4" />
                        <span>Google Pay</span>
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchPaymentMethod === "card" && (
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cardName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name on Card</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {watchPaymentMethod === "paypal" && (
            <div className="rounded-md border p-4 text-center">
              <p className="text-sm text-muted-foreground">
                You will be redirected to PayPal to complete your payment.
              </p>
            </div>
          )}

          {watchPaymentMethod === "googlepay" && (
            <div className="rounded-md border p-4 text-center">
              <p className="text-sm text-muted-foreground">
                You will be redirected to Google Pay to complete your payment.
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
