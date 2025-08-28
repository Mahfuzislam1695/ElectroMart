"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductQuickViewProps {
  productId: string
  onClose: () => void
}

// Mock product data - in real app, fetch by ID
const mockProduct = {
  id: "1",
  name: "LG 1.5 Ton 5 Star Inverter Split AC",
  image: "/lg-air-conditioner-white-modern.png",
  price: 45000,
  originalPrice: 52000,
  rating: 4.5,
  reviews: 234,
  specifications: ["1.5 Ton", "5 Star", "Inverter", "Copper Condenser", "Dual Inverter Compressor"],
  features: [
    "Energy Efficient 5 Star Rating",
    "Copper Condenser for Better Cooling",
    "Dual Inverter Compressor",
    "Smart Diagnosis",
    "10 Year Warranty on Compressor",
  ],
  emiAvailable: true,
  inStock: true,
  discount: 13,
}

export default function ProductQuickView({ productId, onClose }: ProductQuickViewProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-left">Quick View</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image src={mockProduct.image || "/placeholder.svg"} alt={mockProduct.name} fill className="object-cover" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {mockProduct.discount > 0 && <Badge className="bg-red-500 text-white">{mockProduct.discount}% OFF</Badge>}
              {mockProduct.emiAvailable && (
                <Badge className="bg-green-500 text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  EMI Available
                </Badge>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">{mockProduct.name}</h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium ml-1">{mockProduct.rating}</span>
              </div>
              <span className="text-gray-500">({mockProduct.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-gray-900">৳{mockProduct.price.toLocaleString()}</span>
              {mockProduct.originalPrice > mockProduct.price && (
                <span className="text-lg text-gray-500 line-through">
                  ৳{mockProduct.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* EMI Info */}
            {mockProduct.emiAvailable && (
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-700 font-medium">
                  EMI starts from ৳{Math.round(mockProduct.price / 12).toLocaleString()}/month
                </p>
                <p className="text-sm text-green-600">No cost EMI available on select cards</p>
              </div>
            )}

            {/* Key Specifications */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Specifications</h3>
              <div className="flex flex-wrap gap-2">
                {mockProduct.specifications.map((spec, index) => (
                  <Badge key={index} variant="outline">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
              <ul className="space-y-1">
                {mockProduct.features.map((feature, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-start">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button className="flex-1" disabled={!mockProduct.inStock}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="w-4 h-4" />
              </Button>
            </div>

            {/* View Full Details Link */}
            <Link href={`/product/${mockProduct.id}`}>
              <Button variant="outline" className="w-full bg-transparent">
                View Full Details
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
