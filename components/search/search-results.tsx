"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Eye, Heart, ShoppingCart, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import SearchBreadcrumb from "./search-breadcrumb"
import SearchFilters from "./search-filters"
import BestMatchSection from "./best-match-section"
import SearchSuggestions from "./search-suggestions"

interface SearchResultsProps {
  query: string
}

// Mock search results data
const mockSearchResults = [
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
    relevanceScore: 95,
    matchReasons: ["Exact tonnage match", "Energy efficient", "Within budget range"],
  },
  {
    id: "2",
    name: "Samsung 1.5 Ton 3 Star Split AC",
    image: "/samsung-ac-white-modern.png",
    price: 38000,
    originalPrice: 42000,
    rating: 4.2,
    reviews: 156,
    specifications: ["1.5 Ton", "3 Star", "Split AC", "Copper Condenser"],
    emiAvailable: true,
    inStock: true,
    discount: 10,
    relevanceScore: 88,
    matchReasons: ["Tonnage match", "Popular brand", "Good value"],
  },
  {
    id: "3",
    name: "Daikin 1.5 Ton 5 Star Inverter AC",
    image: "/daikin-ac-white-modern.png",
    price: 52000,
    originalPrice: 58000,
    rating: 4.6,
    reviews: 89,
    specifications: ["1.5 Ton", "5 Star", "Inverter", "R32 Refrigerant"],
    emiAvailable: true,
    inStock: true,
    discount: 10,
    relevanceScore: 92,
    matchReasons: ["Premium brand", "High efficiency", "Latest technology"],
  },
]

export default function SearchResults({ query }: SearchResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [sortBy, setSortBy] = useState("relevance")
  const [interpretedQuery, setInterpretedQuery] = useState("")
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    // Simulate NLP processing of search query
    if (query.toLowerCase().includes("1.5 ton ac") || query.toLowerCase().includes("air conditioner")) {
      setInterpretedQuery("1.5 ton AC under 50,000 BDT")
      setTotalResults(47)
    } else if (query.toLowerCase().includes("refrigerator") || query.toLowerCase().includes("fridge")) {
      setInterpretedQuery("Refrigerators with energy efficiency")
      setTotalResults(32)
    } else {
      setInterpretedQuery(query)
      setTotalResults(mockSearchResults.length)
    }
  }, [query])

  const handleSortChange = (value: string) => {
    setSortBy(value)
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <SearchBreadcrumb query={query} />

      <div className="container mx-auto px-4 py-6">
        {/* Search Query Interpretation */}
        <div className="glass-card p-6 rounded-2xl mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Search className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Results</h1>
              <p className="text-gray-600">
                Showing results for: <span className="font-semibold text-blue-600">"{interpretedQuery}"</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
              {totalResults} Products Found
            </span>
            <span>•</span>
            <span>Sorted by Relevance</span>
            <span>•</span>
            <span>Free Delivery Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters query={query} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Best Match Section */}
            <BestMatchSection products={mockSearchResults.slice(0, 3)} />

            {/* Search Suggestions */}
            <SearchSuggestions query={query} />

            {/* Sort Options */}
            <div className="glass-card p-4 rounded-2xl mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">
                    Showing {mockSearchResults.length} of {totalResults} results
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Results */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {mockSearchResults.map((product) => (
                <div
                  key={product.id}
                  className="glass-card rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg?height=300&width=300&query=air conditioner"}
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
                      <Badge className="bg-blue-500 text-white">{product.relevanceScore}% Match</Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="w-10 h-10 p-0 rounded-full">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Match Reasons */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.matchReasons.slice(0, 2).map((reason, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-green-50 text-green-700 border-green-200"
                        >
                          {reason}
                        </Badge>
                      ))}
                    </div>

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
                        <span className="text-sm text-gray-500 line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
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
          </div>
        </div>
      </div>
    </div>
  )
}
