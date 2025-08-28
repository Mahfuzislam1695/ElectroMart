"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Star } from "lucide-react"

const categories = ["Air Conditioners", "Refrigerators", "Smart TVs", "Washing Machines", "Mobile Phones", "Laptops"]

export function BrandForm() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [qualityRating, setQualityRating] = useState(4)

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
    } else {
      setSelectedCategories([...selectedCategories, category])
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Brand Name</Label>
          <Input id="name" placeholder="Enter brand name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input id="website" placeholder="https://example.com" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Brand Description</Label>
        <Textarea id="description" placeholder="Enter brand description" className="min-h-[80px]" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Brand Logo</CardTitle>
          <CardDescription>Upload the brand logo (recommended: 200x200px)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              <Button variant="outline" size="sm">
                Upload Logo
              </Button>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 2MB</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Product Categories</CardTitle>
          <CardDescription>Select which categories this brand operates in</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category)}
                className="justify-start"
              >
                {category}
              </Button>
            ))}
          </div>

          {selectedCategories.length > 0 && (
            <div className="mt-4">
              <Label className="text-sm">Selected Categories:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedCategories.map((category) => (
                  <Badge key={category} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quality Rating</CardTitle>
          <CardDescription>Set the brand quality rating for search ranking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= qualityRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setQualityRating(star)}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({qualityRating}/5)</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="featured" />
          <Label htmlFor="featured">Featured Brand</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="active" defaultChecked />
          <Label htmlFor="active">Active</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Create Brand</Button>
      </div>
    </div>
  )
}
