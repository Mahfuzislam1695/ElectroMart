import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProductRecommendationsProps {
  currentProductId: string
  category: string
}

// Mock recommendation data
const recommendations = {
  similar: [
    {
      id: "similar-1",
      name: "Samsung 1.5 Ton Inverter AC",
      image: "/samsung-ac-white-modern.png",
      price: 42000,
      originalPrice: 48000,
      rating: 4.3,
      reviews: 189,
    },
    {
      id: "similar-2",
      name: "Daikin 1.5 Ton Inverter AC",
      image: "/daikin-ac-white-modern.png",
      price: 48000,
      originalPrice: 52000,
      rating: 4.6,
      reviews: 156,
    },
  ],
  better: [
    {
      id: "better-1",
      name: "LG 2 Ton Dual Inverter AC",
      image: "/lg-2-ton-ac-white.png",
      price: 55000,
      originalPrice: 62000,
      rating: 4.7,
      reviews: 234,
      badge: "Higher Capacity",
    },
    {
      id: "better-2",
      name: "Carrier 1.5 Ton 5 Star AC",
      image: "/carrier-ac-white-modern.png",
      price: 52000,
      originalPrice: 58000,
      rating: 4.8,
      reviews: 178,
      badge: "Premium Brand",
    },
  ],
  bundle: [
    {
      id: "bundle-1",
      name: "AC Stabilizer",
      image: "/ac-stabilizer-modern.png",
      price: 3500,
      originalPrice: 4200,
      rating: 4.4,
      reviews: 89,
    },
    {
      id: "bundle-2",
      name: "AC Cover",
      image: "/ac-cover-waterproof.png",
      price: 1200,
      originalPrice: 1500,
      rating: 4.2,
      reviews: 156,
    },
  ],
}

export default function ProductRecommendations({ currentProductId, category }: ProductRecommendationsProps) {
  const ProductCard = ({ product, showBadge = false }: { product: any; showBadge?: boolean }) => (
    <Card className="glass-card hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-3 rounded-lg overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {showBadge && product.badge && (
            <Badge className="absolute top-2 left-2 bg-blue-600 text-white">{product.badge}</Badge>
          )}
        </div>

        <Link href={`/product/${product.id}`}>
          <h4 className="font-medium text-sm mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.name}
          </h4>
        </Link>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-gray-900">৳{product.price.toLocaleString()}</span>
          {product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">৳{product.originalPrice.toLocaleString()}</span>
          )}
        </div>

        <Button size="sm" className="w-full">
          <ShoppingCart className="w-4 h-4 mr-1" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-8">
      {/* Similar Products */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Similar Products</CardTitle>
          <p className="text-sm text-gray-600">Products with similar features and specifications</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.similar.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Better Alternatives */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Better Alternatives</CardTitle>
          <p className="text-sm text-gray-600">Higher-rated or more feature-rich options</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.better.map((product) => (
              <ProductCard key={product.id} product={product} showBadge />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Frequently Bought Together */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Frequently Bought Together</CardTitle>
          <p className="text-sm text-gray-600">Complete your purchase with these accessories</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendations.bundle.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-blue-900">Bundle Offer</p>
                <p className="text-sm text-blue-700">Save ৳2,500 when you buy all together</p>
              </div>
              <Button>Add Bundle to Cart</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
