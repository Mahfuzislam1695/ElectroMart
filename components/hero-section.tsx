"use client"

import { Search, Zap, Shield, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const quickCategories = ["Air Conditioners", "Refrigerators", "TVs", "Washing Machines"]

const features = [
  { icon: Zap, text: "Fast Delivery" },
  { icon: Shield, text: "Warranty" },
  { icon: Truck, text: "Free Shipping" },
]

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6">
            Find Your Perfect
            <span className="text-primary"> Electronics</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
            Discover the best electronics in Bangladesh with EMI options, warranty protection, and fast delivery to your
            doorstep.
          </p>

          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for electronics... (e.g., 1.5 ton AC under 50,000 BDT)"
                className="pl-12 pr-4 py-4 text-lg glass-card border-2 border-primary/20 focus:border-primary/40"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
            </div>
          </div>

          {/* Quick Category Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {quickCategories.map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors glass-card"
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-8">
            {features.map((feature) => (
              <div key={feature.text} className="flex items-center gap-2 text-muted-foreground">
                <feature.icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
