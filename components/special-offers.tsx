"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Percent, CreditCard } from "lucide-react"
import { useState, useEffect } from "react"

const offers = [
  {
    title: "Flash Sale",
    description: "Up to 40% off on Smart TVs",
    discount: "40% OFF",
    timeLeft: "2h 30m",
    icon: Percent,
    color: "bg-red-500",
  },
  {
    title: "EMI Offer",
    description: "0% Interest on AC purchases",
    discount: "0% EMI",
    timeLeft: "5 days",
    icon: CreditCard,
    color: "bg-green-500",
  },
  {
    title: "Weekend Deal",
    description: "Free delivery on orders above 20,000 BDT",
    discount: "FREE DELIVERY",
    timeLeft: "1 day",
    icon: Clock,
    color: "bg-blue-500",
  },
]

export function SpecialOffers() {
  const [currentOffer, setCurrentOffer] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentOffer((prev) => (prev + 1) % offers.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Special Offers & Promotions</h2>
          <p className="text-lg text-muted-foreground">Don't miss out on these amazing deals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card
              key={offer.title}
              className={`glass-card transition-all duration-500 ${
                index === currentOffer ? "ring-2 ring-primary scale-105" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-full ${offer.color} text-white`}>
                    <offer.icon className="h-6 w-6" />
                  </div>
                  <Badge variant="destructive" className="animate-pulse">
                    {offer.timeLeft} left
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2">{offer.title}</h3>
                <p className="text-muted-foreground mb-4">{offer.description}</p>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-lg font-bold">
                    {offer.discount}
                  </Badge>
                  <Button size="sm">Shop Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
