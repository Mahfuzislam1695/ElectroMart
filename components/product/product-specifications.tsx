"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, FileText, Star } from "lucide-react"

interface ProductSpecificationsProps {
  specifications: Record<string, string>
  features: string[]
  description: string
}

export default function ProductSpecifications({ specifications, features, description }: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "features">("overview")

  const displayedSpecs = isExpanded ? specifications : Object.fromEntries(Object.entries(specifications).slice(0, 6))

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("specs")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "specs" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Specifications
        </button>
        <button
          onClick={() => setActiveTab("features")}
          className={`px-6 py-3 font-medium transition-colors ${
            activeTab === "features" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Features
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Product Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{description}</p>
          </CardContent>
        </Card>
      )}

      {activeTab === "specs" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Detailed Specifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(displayedSpecs).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                  <span className="font-medium text-gray-700">{key}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            {Object.keys(specifications).length > 6 && (
              <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)} className="w-full mt-4">
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Show More Specifications
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === "features" && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-blue-600" />
              Key Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compare with Similar Products */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Compare with Similar Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Samsung 1.5 Ton AC", price: "₹42,000", rating: 4.3 },
              { name: "Daikin 1.5 Ton AC", price: "₹48,000", rating: 4.6 },
              { name: "Voltas 1.5 Ton AC", price: "₹38,000", rating: 4.1 },
            ].map((product, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-2">{product.name}</h4>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-600">{product.price}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{product.rating}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                  Compare
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
