import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  specifications: string[]
  emiAvailable: boolean
  inStock: boolean
  discount: number
  relevanceScore: number
  matchReasons: string[]
}

interface BestMatchSectionProps {
  products: Product[]
}

export default function BestMatchSection({ products }: BestMatchSectionProps) {
  return (
    <div className="glass-card p-6 rounded-2xl mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
          <Star className="w-4 h-4 text-white fill-current" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Best Matches</h2>
          <p className="text-sm text-gray-600">Top products that best match your search criteria</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {products.map((product, index) => (
          <div key={product.id} className="relative bg-white/50 rounded-xl p-4 border border-white/20">
            {/* Rank Badge */}
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {index + 1}
            </div>

            <div className="flex gap-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg?height=80&width=80&query=electronics"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.discount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1">
                    {product.discount}%
                  </Badge>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Match Score */}
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-700 text-xs">{product.relevanceScore}% Match</Badge>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs ml-1">{product.rating}</span>
                  </div>
                </div>

                {/* Match Reasons */}
                <div className="mb-2">
                  <p className="text-xs text-gray-600 font-medium mb-1">Why it's a good match:</p>
                  <ul className="text-xs text-gray-500 space-y-0.5">
                    {product.matchReasons.slice(0, 2).map((reason, idx) => (
                      <li key={idx} className="flex items-center">
                        <span className="w-1 h-1 bg-green-500 rounded-full mr-2"></span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="font-bold text-gray-900 text-sm">৳{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-gray-500 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* EMI */}
                {product.emiAvailable && (
                  <p className="text-xs text-green-600 mb-2">
                    EMI: ৳{Math.round(product.price / 12).toLocaleString()}/mo
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-1">
                  <Button size="sm" className="flex-1 text-xs h-7">
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 w-7 p-0 bg-transparent">
                    <Eye className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
