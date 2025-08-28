import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, Search } from "lucide-react"
import Link from "next/link"

interface SearchSuggestionsProps {
  query: string
}

export default function SearchSuggestions({ query }: SearchSuggestionsProps) {
  // Generate suggestions based on query
  const getDidYouMeanSuggestions = (searchQuery: string) => {
    if (searchQuery.toLowerCase().includes("ac") || searchQuery.toLowerCase().includes("air conditioner")) {
      return ["1.5 ton inverter AC", "split air conditioner", "5 star AC"]
    } else if (searchQuery.toLowerCase().includes("refrigerator")) {
      return ["double door refrigerator", "frost free fridge", "inverter refrigerator"]
    }
    return ["smart TV", "washing machine", "microwave oven"]
  }

  const getRelatedSearches = (searchQuery: string) => {
    if (searchQuery.toLowerCase().includes("ac") || searchQuery.toLowerCase().includes("air conditioner")) {
      return [
        "Best AC under 50000",
        "Energy efficient air conditioners",
        "AC with copper condenser",
        "Inverter vs non-inverter AC",
        "AC installation service",
      ]
    } else if (searchQuery.toLowerCase().includes("refrigerator")) {
      return [
        "Best refrigerator brands",
        "Energy saving refrigerators",
        "Refrigerator buying guide",
        "Double door vs single door",
        "Refrigerator maintenance tips",
      ]
    }
    return [
      "Electronics deals",
      "Home appliances",
      "Smart home devices",
      "Energy efficient appliances",
      "Best electronics brands",
    ]
  }

  const didYouMeanSuggestions = getDidYouMeanSuggestions(query)
  const relatedSearches = getRelatedSearches(query)

  return (
    <div className="grid gap-4 md:grid-cols-2 mb-6">
      {/* Did You Mean */}
      <div className="glass-card p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-4 h-4 text-yellow-500" />
          <h3 className="font-semibold text-gray-900">Did you mean?</h3>
        </div>
        <div className="space-y-2">
          {didYouMeanSuggestions.map((suggestion, index) => (
            <Link key={index} href={`/search?q=${encodeURIComponent(suggestion)}`}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2">
                <Search className="w-3 h-3 mr-2 text-gray-400" />
                <span className="text-sm">{suggestion}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Related Searches */}
      <div className="glass-card p-4 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Related Searches</h3>
        </div>
        <div className="space-y-2">
          {relatedSearches.slice(0, 4).map((search, index) => (
            <Link key={index} href={`/search?q=${encodeURIComponent(search)}`}>
              <Button variant="ghost" size="sm" className="w-full justify-start text-left h-auto p-2">
                <TrendingUp className="w-3 h-3 mr-2 text-gray-400" />
                <span className="text-sm">{search}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
