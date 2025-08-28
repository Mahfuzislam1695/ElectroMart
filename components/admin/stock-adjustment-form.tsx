"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Minus } from "lucide-react"

const products = [
  { id: "1", name: "Samsung 1.5 Ton Inverter AC", sku: "SAM-AC-001", currentStock: 25 },
  { id: "2", name: "LG 260L Refrigerator", sku: "LG-REF-001", currentStock: 5 },
  { id: "3", name: 'Sony 55" 4K Smart TV', sku: "SONY-TV-001", currentStock: 0 },
]

const adjustmentTypes = [
  { value: "purchase", label: "Purchase/Restock" },
  { value: "sale", label: "Sale" },
  { value: "return", label: "Return" },
  { value: "damage", label: "Damage/Loss" },
  { value: "adjustment", label: "Manual Adjustment" },
  { value: "transfer", label: "Transfer" },
]

export function StockAdjustmentForm() {
  const [selectedProduct, setSelectedProduct] = useState("")
  const [adjustmentType, setAdjustmentType] = useState("")
  const [quantity, setQuantity] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedProductData = products.find((p) => p.id === selectedProduct)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Select Product</CardTitle>
          <CardDescription>Choose the product to adjust inventory for</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="max-h-48 overflow-y-auto space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedProduct === product.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => setSelectedProduct(product.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sku}</div>
                  </div>
                  <Badge variant="outline">Stock: {product.currentStock}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedProductData && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Current Stock Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="text-sm text-gray-600">Product</div>
                <div className="font-medium">{selectedProductData.name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Current Stock</div>
                <div className="font-medium">{selectedProductData.currentStock} units</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Adjustment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Adjustment Type</Label>
              <Select value={adjustmentType} onValueChange={setAdjustmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {adjustmentTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity((prev) => String(Math.max(0, Number.parseInt(prev || "0") - 1)))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="text-center"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity((prev) => String(Number.parseInt(prev || "0") + 1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason/Notes</Label>
            <Textarea id="reason" placeholder="Enter reason for adjustment" className="min-h-[80px]" />
          </div>

          {selectedProductData && quantity && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-blue-900">Adjustment Preview</div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Current Stock:</span>
                    <span>{selectedProductData.currentStock} units</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Adjustment:</span>
                    <span
                      className={
                        adjustmentType === "purchase" || adjustmentType === "return" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {adjustmentType === "purchase" || adjustmentType === "return" ? "+" : "-"}
                      {quantity} units
                    </span>
                  </div>
                  <div className="flex justify-between font-medium border-t pt-1">
                    <span>New Stock:</span>
                    <span>
                      {adjustmentType === "purchase" || adjustmentType === "return"
                        ? selectedProductData.currentStock + Number.parseInt(quantity || "0")
                        : selectedProductData.currentStock - Number.parseInt(quantity || "0")}{" "}
                      units
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600" disabled={!selectedProduct || !quantity}>
          Apply Adjustment
        </Button>
      </div>
    </div>
  )
}
