"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Clock } from "lucide-react"

interface SearchSuggestion {
  query: string
  type: "suggestion" | "trending" | "recent"
  category?: string
  results?: number
}

interface IntelligentSearchProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
}

export function IntelligentSearch({
  placeholder = "Search for electronics...",
  className = "",
  onSearch,
}: IntelligentSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Mock intelligent suggestions based on query
  const generateSuggestions = (searchQuery: string): SearchSuggestion[] => {
    if (!searchQuery.trim()) {
      return [
        { query: "1.5 ton AC under 50,000 BDT", type: "trending", category: "AC", results: 47 },
        { query: "Samsung refrigerator double door", type: "trending", category: "Refrigerator", results: 23 },
        { query: "Smart TV 55 inch", type: "recent", category: "TV", results: 89 },
        { query: "Washing machine front load", type: "suggestion", category: "Appliances", results: 34 },
        { query: "iPhone 15 Pro Max", type: "trending", category: "Mobile", results: 12 },
      ]
    }

    const lowerQuery = searchQuery.toLowerCase()
    const suggestions: SearchSuggestion[] = []

    // Natural language processing simulation
    if (lowerQuery.includes("ac") || lowerQuery.includes("air conditioner")) {
      suggestions.push(
        { query: `${searchQuery} inverter`, type: "suggestion", category: "AC", results: 34 },
        { query: `${searchQuery} 5 star`, type: "suggestion", category: "AC", results: 28 },
        { query: `${searchQuery} split`, type: "suggestion", category: "AC", results: 45 },
        { query: "1.5 ton inverter AC under 50000", type: "trending", category: "AC", results: 23 },
      )
    } else if (lowerQuery.includes("refrigerator") || lowerQuery.includes("fridge")) {
      suggestions.push(
        { query: `${searchQuery} double door`, type: "suggestion", category: "Refrigerator", results: 29 },
        { query: `${searchQuery} frost free`, type: "suggestion", category: "Refrigerator", results: 41 },
        { query: `${searchQuery} inverter`, type: "suggestion", category: "Refrigerator", results: 33 },
        { query: "Samsung refrigerator 253L", type: "trending", category: "Refrigerator", results: 18 },
      )
    } else if (lowerQuery.includes("tv") || lowerQuery.includes("television")) {
      suggestions.push(
        { query: `${searchQuery} smart`, type: "suggestion", category: "TV", results: 67 },
        { query: `${searchQuery} 4K`, type: "suggestion", category: "TV", results: 54 },
        { query: `${searchQuery} 55 inch`, type: "suggestion", category: "TV", results: 43 },
        { query: "Sony Bravia 65 inch", type: "trending", category: "TV", results: 12 },
      )
    } else if (lowerQuery.includes("mobile") || lowerQuery.includes("phone")) {
      suggestions.push(
        { query: `${searchQuery} smartphone`, type: "suggestion", category: "Mobile", results: 89 },
        { query: `${searchQuery} android`, type: "suggestion", category: "Mobile", results: 76 },
        { query: `${searchQuery} 5G`, type: "suggestion", category: "Mobile", results: 45 },
        { query: "iPhone 15 Pro Max", type: "trending", category: "Mobile", results: 8 },
      )
    } else {
      // Generic suggestions
      suggestions.push(
        { query: `${searchQuery} best price`, type: "suggestion", results: 156 },
        { query: `${searchQuery} reviews`, type: "suggestion", results: 89 },
        { query: `${searchQuery} EMI available`, type: "suggestion", results: 234 },
        { query: `${searchQuery} latest model`, type: "suggestion", results: 67 },
      )
    }

    return suggestions.slice(0, 6)
  }

  // Debounced search suggestions
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        setIsLoading(true)
        // Simulate API delay
        setTimeout(() => {
          setSuggestions(generateSuggestions(query))
          setIsLoading(false)
        }, 300)
      } else {
        setSuggestions(generateSuggestions(""))
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [query])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery.trim())
      } else {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      }
      setShowSuggestions(false)
      setQuery("")
    }
  }

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    handleSearch(suggestion.query)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "trending":
        return <TrendingUp className="w-4 h-4 text-orange-500" />
      case "recent":
        return <Clock className="w-4 h-4 text-blue-500" />
      default:
        return <Search className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="pl-10 glass-card"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>

      {/* Intelligent Suggestions Dropdown */}
      {showSuggestions && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 glass-card rounded-2xl shadow-2xl border border-white/20 z-50 max-h-96 overflow-y-auto"
        >
          <div className="p-4">
            {query.length === 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => handleSearch("1.5 ton AC")}
                  >
                    1.5 ton AC
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => handleSearch("Smart TV")}
                  >
                    Smart TV
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => handleSearch("Refrigerator")}
                  >
                    Refrigerator
                  </Badge>
                  <Badge
                    variant="outline"
                    className="cursor-pointer hover:bg-blue-50"
                    onClick={() => handleSearch("EMI available")}
                  >
                    EMI available
                  </Badge>
                </div>
              </div>
            )}

            <div className="space-y-1">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/50 transition-colors text-left group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {getSuggestionIcon(suggestion.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {suggestion.query}
                      </p>
                      {suggestion.category && <p className="text-xs text-gray-500">in {suggestion.category}</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {suggestion.results && (
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.results} results
                      </Badge>
                    )}
                    {suggestion.type === "trending" && (
                      <Badge className="bg-orange-100 text-orange-700 text-xs">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                    {suggestion.type === "recent" && (
                      <Badge className="bg-blue-100 text-blue-700 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        Recent
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {query.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <Button
                  onClick={() => handleSearch(query)}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search for "{query}"
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
