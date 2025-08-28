"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Plus } from "lucide-react"

const attributeTypes = [
  { value: "select", label: "Select (Dropdown)" },
  { value: "multiselect", label: "Multi-Select" },
  { value: "range", label: "Range (Min-Max)" },
  { value: "text", label: "Text Input" },
  { value: "boolean", label: "Yes/No" },
]

const categories = ["Air Conditioners", "Refrigerators", "Smart TVs", "Washing Machines", "Mobile Phones", "Laptops"]

export function AttributeForm() {
  const [attributeType, setAttributeType] = useState("")
  const [options, setOptions] = useState<string[]>([])
  const [newOption, setNewOption] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const addOption = () => {
    if (newOption.trim() && !options.includes(newOption.trim())) {
      setOptions([...options, newOption.trim()])
      setNewOption("")
    }
  }

  const removeOption = (option: string) => {
    setOptions(options.filter((opt) => opt !== option))
  }

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
          <Label htmlFor="name">Attribute Name</Label>
          <Input id="name" placeholder="e.g., Tonnage, Capacity" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Attribute Type</Label>
          <Select value={attributeType} onValueChange={setAttributeType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {attributeTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(attributeType === "select" || attributeType === "multiselect") && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Options</CardTitle>
            <CardDescription>Define the available options for this attribute</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-2">
              <Input
                placeholder="Add option"
                value={newOption}
                onChange={(e) => setNewOption(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addOption()}
              />
              <Button onClick={addOption} variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {options.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {options.map((option) => (
                  <Badge key={option} variant="secondary" className="flex items-center gap-1">
                    {option}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeOption(option)} />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {attributeType === "range" && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Range Settings</CardTitle>
            <CardDescription>Define the minimum and maximum values</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min">Minimum Value</Label>
                <Input id="min" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Maximum Value</Label>
                <Input id="max" type="number" placeholder="1000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unit</Label>
                <Input id="unit" placeholder="e.g., L, kg, inch" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Applicable Categories</CardTitle>
          <CardDescription>Select which categories this attribute applies to</CardDescription>
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

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch id="required" />
          <Label htmlFor="required">Required Attribute</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="filterable" defaultChecked />
          <Label htmlFor="filterable">Show in Filters</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch id="searchable" />
          <Label htmlFor="searchable">Searchable</Label>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Create Attribute</Button>
      </div>
    </div>
  )
}
