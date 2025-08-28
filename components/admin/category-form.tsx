"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

const parentCategories = [
  { value: "none", label: "No Parent (Root Category)" },
  { value: "electronics", label: "Electronics" },
  { value: "appliances", label: "Home Appliances" },
  { value: "mobile", label: "Mobile & Accessories" },
]

const availableAttributes = ["Brand", "Price Range", "Energy Rating", "Capacity", "Size", "Color", "Warranty"]

export function CategoryForm() {
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])
  const [customAttribute, setCustomAttribute] = useState("")

  const addAttribute = (attribute: string) => {
    if (!selectedAttributes.includes(attribute)) {
      setSelectedAttributes([...selectedAttributes, attribute])
    }
  }

  const removeAttribute = (attribute: string) => {
    setSelectedAttributes(selectedAttributes.filter((attr) => attr !== attribute))
  }

  const addCustomAttribute = () => {
    if (customAttribute.trim() && !selectedAttributes.includes(customAttribute.trim())) {
      setSelectedAttributes([...selectedAttributes, customAttribute.trim()])
      setCustomAttribute("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Category Name</Label>
          <Input id="name" placeholder="Enter category name" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <Input id="slug" placeholder="auto-generated-slug" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="parent">Parent Category</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select parent category" />
          </SelectTrigger>
          <SelectContent>
            {parentCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" placeholder="Enter category description" className="min-h-[80px]" />
      </div>

      <div className="space-y-4">
        <Label>Category Attributes</Label>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {availableAttributes.map((attribute) => (
              <Button
                key={attribute}
                variant={selectedAttributes.includes(attribute) ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  selectedAttributes.includes(attribute) ? removeAttribute(attribute) : addAttribute(attribute)
                }
              >
                {attribute}
              </Button>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add custom attribute"
              value={customAttribute}
              onChange={(e) => setCustomAttribute(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCustomAttribute()}
            />
            <Button onClick={addCustomAttribute} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {selectedAttributes.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm">Selected Attributes:</Label>
              <div className="flex flex-wrap gap-2">
                {selectedAttributes.map((attribute) => (
                  <Badge key={attribute} variant="secondary" className="flex items-center gap-1">
                    {attribute}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeAttribute(attribute)} />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="featured" />
        <Label htmlFor="featured">Featured Category</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="active" defaultChecked />
        <Label htmlFor="active">Active</Label>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Create Category</Button>
      </div>
    </div>
  )
}
