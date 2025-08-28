"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Zap, Shield, Truck, Plus, Minus } from "lucide-react"
import Image from "next/image"
import EMICalculator from "./emi-calculator"

interface ProductInfoProps {
  product: {
    id: string
    name: string
    model: string
    brand: string
    brandLogo: string
    price: number
    originalPrice: number
    rating: number
    reviewCount: number
    inStock: boolean
    stockCount: number
    emiAvailable: boolean
    emiOptions: { tenure: number; amount: number }[]
    warranty: {
      comprehensive: string
      compressor: string
      parts: string
    }
    shipping: {
      freeDelivery: boolean
      deliveryTime: string
      installation: boolean
      installationCharge: number
    }
  }
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(product.stockCount, quantity + change)))
  }

  return (
    <div className="space-y-6">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Image
          src={product.brandLogo || "/placeholder.svg"}
          alt={product.brand}
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-lg font-semibold text-gray-700">{product.brand}</span>
      </div>

      {/* Product Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <p className="text-gray-600">Model: {product.model}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="font-semibold">{product.rating}</span>
        </div>
        <span className="text-gray-500">({product.reviewCount} reviews)</span>
      </div>

      {/* Price */}
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <span className="text-3xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-xl text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
              <Badge className="bg-red-500 text-white">{discount}% OFF</Badge>
            </>
          )}
        </div>
        <p className="text-sm text-gray-600">Inclusive of all taxes</p>
      </div>

      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {product.inStock ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-green-600 font-medium">In Stock</span>
            <span className="text-gray-500">({product.stockCount} units available)</span>
          </>
        ) : (
          <>
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-red-600 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* EMI Calculator */}
      {product.emiAvailable && <EMICalculator price={product.price} emiOptions={product.emiOptions} />}

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center border rounded-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="px-3"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="px-4 py-2 font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stockCount}
            className="px-3"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <div className="flex gap-3">
          <Button className="flex-1" size="lg" disabled={!product.inStock}>
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart - ৳{(product.price * quantity).toLocaleString()}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className={isWishlisted ? "text-red-500 border-red-500" : ""}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
          </Button>
        </div>

        <Button variant="outline" size="lg" className="w-full bg-transparent" disabled={!product.inStock}>
          Buy Now
        </Button>
      </div>

      {/* Key Benefits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t">
        <div className="flex items-center gap-3">
          <Truck className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-medium text-sm">Free Delivery</p>
            <p className="text-xs text-gray-600">{product.shipping.deliveryTime}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-blue-600" />
          <div>
            <p className="font-medium text-sm">Warranty</p>
            <p className="text-xs text-gray-600">{product.warranty.comprehensive}</p>
          </div>
        </div>

        {product.emiAvailable && (
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-sm">EMI Available</p>
              <p className="text-xs text-gray-600">Starting ৳{product.emiOptions[3]?.amount.toLocaleString()}/month</p>
            </div>
          </div>
        )}

        {product.shipping.installation && (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <div>
              <p className="font-medium text-sm">Installation</p>
              <p className="text-xs text-gray-600">৳{product.shipping.installationCharge}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
