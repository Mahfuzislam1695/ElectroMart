"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Filter, Star } from "lucide-react"

interface CategoryFiltersProps {
  categorySlug: string
  filters: Record<string, string[]>
  searchParams: Record<string, string | undefined>
}

export default function CategoryFilters({ categorySlug, filters, searchParams }: CategoryFiltersProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})

  const updateFilters = (filterType: string, value: string, checked: boolean) => {
    const current = selectedFilters[filterType] || []
    const updated = checked ? [...current, value] : current.filter((v) => v !== value)

    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: updated,
    }))

    // Update URL
    const params = new URLSearchParams(currentSearchParams.toString())
    if (updated.length > 0) {
      params.set(filterType, updated.join(","))
    } else {
      params.delete(filterType)
    }
    router.push(`/category/${categorySlug}?${params.toString()}`)
  }

  const clearAllFilters = () => {
    setSelectedFilters({})
    setPriceRange([0, 100000])
    router.push(`/category/${categorySlug}`)
  }

  const activeFilterCount = Object.values(selectedFilters).flat().length

  return (
    <div className="glass-card p-6 rounded-2xl sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="text-red-600 hover:text-red-700">
            Clear All
          </Button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range (BDT)</h4>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={1000} className="mb-3" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Rating Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Customer Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <Checkbox
                checked={selectedFilters.rating?.includes(rating.toString()) || false}
                onCheckedChange={(checked) => updateFilters("rating", rating.toString(), checked as boolean)}
              />
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Dynamic Filters */}
      {Object.entries(filters).map(([filterType, options]) => (
        <div key={filterType} className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 capitalize">{filterType.replace(/([A-Z])/g, " $1").trim()}</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {options.map((option) => (
              <label key={option} className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={selectedFilters[filterType]?.includes(option) || false}
                  onCheckedChange={(checked) => updateFilters(filterType, option, checked as boolean)}
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      {/* EMI Filter */}
      <Separator className="my-4" />
      <div className="mb-6">
        <label className="flex items-center space-x-2 cursor-pointer">
          <Checkbox
            checked={selectedFilters.emi?.includes("available") || false}
            onCheckedChange={(checked) => updateFilters("emi", "available", checked as boolean)}
          />
          <span className="text-sm font-medium text-gray-700">EMI Available</span>
        </label>
      </div>
    </div>
  )
}
