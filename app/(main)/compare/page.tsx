"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Star, ShoppingCart, Plus, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"

// Mock data for demonstration
const mockCompareProducts = [
  {
    id: "1",
    name: "LG 1.5 Ton 5 Star Inverter Split AC",
    image: "/lg-air-conditioner-white-modern.png",
    price: 45000,
    originalPrice: 52000,
    rating: 4.5,
    brand: "LG",
    inStock: true,
    specifications: {
      Capacity: "1.5 Ton",
      "Star Rating": "5 Star",
      Technology: "Inverter",
      Condenser: "Copper",
      Refrigerant: "R32",
      "Power Consumption": "1050W",
      "Room Size": "150-180 sq ft",
      Warranty: "1 Year Comprehensive + 10 Years Compressor",
      "Special Features": "Wi-Fi Control, Voice Control",
      Installation: "Free Installation",
    },
  },
  {
    id: "2",
    name: "Samsung 1.5 Ton 3 Star Split AC",
    image: "/samsung-ac-white-modern.png",
    price: 38000,
    originalPrice: 45000,
    rating: 4.2,
    brand: "Samsung",
    inStock: true,
    specifications: {
      Capacity: "1.5 Ton",
      "Star Rating": "3 Star",
      Technology: "Fixed Speed",
      Condenser: "Copper",
      Refrigerant: "R32",
      "Power Consumption": "1400W",
      "Room Size": "150-180 sq ft",
      Warranty: "1 Year Comprehensive + 5 Years Compressor",
      "Special Features": "Fast Cooling, Anti-Bacterial Filter",
      Installation: "Paid Installation (₹2,500)",
    },
  },
  {
    id: "3",
    name: "Daikin 1.5 Ton 5 Star Inverter AC",
    image: "/daikin-ac-white-modern.png",
    price: 48000,
    originalPrice: 55000,
    rating: 4.7,
    brand: "Daikin",
    inStock: true,
    specifications: {
      Capacity: "1.5 Ton",
      "Star Rating": "5 Star",
      Technology: "Inverter",
      Condenser: "Copper",
      Refrigerant: "R32",
      "Power Consumption": "980W",
      "Room Size": "150-180 sq ft",
      Warranty: "1 Year Comprehensive + 12 Years Compressor",
      "Special Features": "Coanda Airflow, PM 2.5 Filter",
      Installation: "Free Installation",
    },
  },
]

export default function ComparePage() {
  const [compareProducts, setCompareProducts] = useState(mockCompareProducts)
  const { addToCart } = useCart()

  const removeProduct = (productId: string) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const addProductToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  // Get all unique specification keys
  const allSpecKeys = Array.from(new Set(compareProducts.flatMap((product) => Object.keys(product.specifications))))

  const getSpecValue = (product: any, key: string) => {
    return product.specifications[key] || "N/A"
  }

  const getBestValue = (key: string) => {
    const values = compareProducts.map((p) => getSpecValue(p, key))

    // Determine best value based on specification type
    if (key.includes("Star Rating")) {
      return Math.max(...values.map((v) => Number.parseInt(v) || 0)).toString() + " Star"
    }
    if (key.includes("Power Consumption")) {
      return Math.min(...values.map((v) => Number.parseInt(v) || Number.POSITIVE_INFINITY)).toString() + "W"
    }
    if (key.includes("Warranty") && key.includes("Compressor")) {
      return Math.max(...values.map((v) => Number.parseInt(v) || 0)).toString() + " Years"
    }

    return null
  }

  if (compareProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-glass-bg-light to-glass-bg-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold text-glass-text-primary mb-4">No Products to Compare</h1>
            <p className="text-glass-text-secondary mb-8">Add products from category pages to start comparing</p>
            <Link href="/categories">
              <Button className="glass-button-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-bg-light to-glass-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-glass-text-primary mb-2">Compare Products</h1>
              <p className="text-glass-text-secondary">Compare features, specifications, and prices side by side</p>
            </div>
            <Link href="/categories">
              <Button variant="outline" className="glass-button-secondary bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Add More Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Product Headers */}
              <thead>
                <tr className="border-b border-glass-border">
                  <th className="text-left p-6 w-48 bg-glass-surface/50">
                    <span className="text-glass-text-primary font-semibold">Specifications</span>
                  </th>
                  {compareProducts.map((product) => (
                    <th key={product.id} className="text-center p-6 min-w-80 bg-glass-surface/30">
                      <div className="space-y-4">
                        {/* Remove Button */}
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProduct(product.id)}
                            className="text-glass-text-secondary hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Product Image */}
                        <div className="relative w-32 h-32 mx-auto">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2">
                          <h3 className="font-semibold text-glass-text-primary text-sm leading-tight">
                            {product.name}
                          </h3>

                          {/* Rating */}
                          <div className="flex items-center justify-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>

                          {/* Price */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-lg font-bold text-glass-accent-primary">
                                ৳{product.price.toLocaleString()}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-sm text-glass-text-secondary line-through">
                                  ৳{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <Badge className="glass-badge-success text-xs">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                                OFF
                              </Badge>
                            )}
                          </div>

                          {/* Stock Status */}
                          <div className="flex items-center justify-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                            ></div>
                            <span className={`text-xs ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                              {product.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                          </div>

                          {/* Add to Cart Button */}
                          <Button
                            className="glass-button-primary w-full"
                            size="sm"
                            disabled={!product.inStock}
                            onClick={() => addProductToCart(product)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Specifications Comparison */}
              <tbody>
                {allSpecKeys.map((specKey) => {
                  const bestValue = getBestValue(specKey)

                  return (
                    <tr key={specKey} className="border-b border-glass-border hover:bg-glass-surface/20">
                      <td className="p-4 font-medium text-glass-text-primary bg-glass-surface/50">{specKey}</td>
                      {compareProducts.map((product) => {
                        const value = getSpecValue(product, specKey)
                        const isBest = bestValue && value.includes(bestValue.split(" ")[0])

                        return (
                          <td key={product.id} className="p-4 text-center">
                            <div
                              className={`inline-flex items-center gap-2 ${isBest ? "text-green-600 font-semibold" : "text-glass-text-secondary"}`}
                            >
                              {value}
                              {isBest && <Badge className="glass-badge-success text-xs">Best</Badge>}
                            </div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alternative Suggestions */}
        <Card className="glass-card mt-8">
          <CardHeader>
            <CardTitle className="text-glass-text-primary">You might also like</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Voltas 1.5 Ton 3 Star AC",
                  price: "৳35,000",
                  rating: 4.0,
                  image: "/lg-air-conditioner-white-modern.png",
                },
                {
                  name: "Hitachi 1.5 Ton 5 Star AC",
                  price: "৳52,000",
                  rating: 4.4,
                  image: "/samsung-ac-white-modern.png",
                },
                { name: "Blue Star 1.5 Ton AC", price: "৳41,000", rating: 4.1, image: "/daikin-ac-white-modern.png" },
              ].map((product, index) => (
                <div key={index} className="glass-card rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-32 mb-3">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <h4 className="font-medium text-glass-text-primary mb-2 text-sm">{product.name}</h4>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-bold text-glass-accent-primary">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full glass-button-secondary bg-transparent">
                    Add to Compare
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
