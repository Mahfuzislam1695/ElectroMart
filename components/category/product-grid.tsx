"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, List, Eye, Heart, ShoppingCart, Star, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ProductQuickView from "./product-quick-view"
import ProductCompare from "./product-compare"

interface ProductGridProps {
  categorySlug: string
  searchParams: Record<string, string | undefined>
}

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "LG 1.5 Ton 5 Star Inverter Split AC",
    image: "/lg-air-conditioner-white-modern.png",
    price: 45000,
    originalPrice: 52000,
    rating: 4.5,
    reviews: 234,
    specifications: ["1.5 Ton", "5 Star", "Inverter", "Copper Condenser"],
    emiAvailable: true,
    inStock: true,
    discount: 13,
  },
  {
    id: "2",
    name: "Samsung 253L Double Door Refrigerator",
    image: "/samsung-refrigerator-silver-modern.png",
    price: 32000,
    originalPrice: 38000,
    rating: 4.3,
    reviews: 156,
    specifications: ["253L", "Double Door", "Frost Free", "Digital Inverter"],
    emiAvailable: true,
    inStock: true,
    discount: 16,
  },
  {
    id: "3",
    name: 'Sony 55" 4K Ultra HD Smart LED TV',
    image: "/sony-4k-tv-black-modern.png",
    price: 65000,
    originalPrice: 75000,
    rating: 4.6,
    reviews: 89,
    specifications: ["55 Inch", "4K Ultra HD", "Smart TV", "HDR"],
    emiAvailable: true,
    inStock: true,
    discount: 13,
  },
  {
    id: "4",
    name: "LG 8kg Front Load Washing Machine",
    image: "/lg-washing-machine-white-front-load.png",
    price: 42000,
    originalPrice: 48000,
    rating: 4.4,
    reviews: 178,
    specifications: ["8kg", "Front Load", "Inverter", "Steam Wash"],
    emiAvailable: true,
    inStock: false,
    discount: 13,
  },
  {
    id: "5",
    name: "IFB 30L Convection Microwave Oven",
    image: "/ifb-microwave-oven-silver-modern.png",
    price: 18000,
    originalPrice: 22000,
    rating: 4.2,
    reviews: 92,
    specifications: ["30L", "Convection", "Auto Cook", "Child Lock"],
    emiAvailable: false,
    inStock: true,
    discount: 18,
  },
  {
    id: "6",
    name: "Samsung Galaxy S24 Ultra 256GB",
    image: "/samsung-galaxy-s24-ultra-black-modern.png",
    price: 125000,
    originalPrice: 135000,
    rating: 4.7,
    reviews: 445,
    specifications: ["256GB", "12GB RAM", "200MP Camera", "5G"],
    emiAvailable: true,
    inStock: true,
    discount: 7,
  },
]

export default function ProductGrid({ categorySlug, searchParams }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popularity")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<string | null>(null)

  const toggleProductSelection = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="glass-card p-4 rounded-2xl mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Showing {mockProducts.length} of 150+ products</span>
            {selectedProducts.length > 0 && (
              <Badge variant="secondary">{selectedProducts.length} selected for comparison</Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Bar */}
      {selectedProducts.length > 0 && (
        <ProductCompare selectedProducts={selectedProducts} onClearSelection={() => setSelectedProducts([])} />
      )}

      {/* Product Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
      >
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
          >
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {product.discount > 0 && <Badge className="bg-red-500 text-white">{product.discount}% OFF</Badge>}
                {product.emiAvailable && (
                  <Badge className="bg-green-500 text-white">
                    <Zap className="w-3 h-3 mr-1" />
                    EMI
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-10 h-10 p-0 rounded-full"
                  onClick={() => setQuickViewProduct(product.id)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              {/* Compare Checkbox */}
              <div className="absolute bottom-3 left-3">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleProductSelection(product.id)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">Compare</span>
                </label>
              </div>

              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive">Out of Stock</Badge>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              {/* Specifications */}
              <div className="flex flex-wrap gap-1 mb-3">
                {product.specifications.slice(0, 3).map((spec, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
                )}
              </div>

              {/* EMI Info */}
              {product.emiAvailable && (
                <p className="text-sm text-green-600 mb-4">
                  EMI starts from ৳{Math.round(product.price / 12).toLocaleString()}/month
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1" disabled={!product.inStock}>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && <ProductQuickView productId={quickViewProduct} onClose={() => setQuickViewProduct(null)} />}
    </div>
  )
}
