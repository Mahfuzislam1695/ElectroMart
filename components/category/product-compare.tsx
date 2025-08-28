"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, ArrowRight } from "lucide-react"

interface ProductCompareProps {
  selectedProducts: string[]
  onClearSelection: () => void
}

export default function ProductCompare({ selectedProducts, onClearSelection }: ProductCompareProps) {
  return (
    <div className="glass-card p-4 rounded-2xl mb-6 border-2 border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500 text-white">{selectedProducts.length} Products Selected</Badge>
          <span className="text-sm text-gray-600">Compare features, specifications, and prices</span>
        </div>

        <div className="flex items-center gap-2">
          <Button disabled={selectedProducts.length < 2} className="bg-blue-600 hover:bg-blue-700">
            Compare Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {selectedProducts.length < 2 && (
        <p className="text-xs text-gray-500 mt-2">Select at least 2 products to compare</p>
      )}
    </div>
  )
}
