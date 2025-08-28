"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, X, Calendar } from "lucide-react"

const ruleTypes = [
  { value: "percentage", label: "Percentage Discount" },
  { value: "fixed", label: "Fixed Amount" },
  { value: "tiered", label: "Tiered Pricing" },
  { value: "bogo", label: "Buy One Get One" },
]

const categories = [
  "All Categories",
  "Air Conditioners",
  "Refrigerators",
  "Smart TVs",
  "Washing Machines",
  "Mobile Phones",
  "Laptops",
]

export function PricingRulesForm() {
  const [ruleType, setRuleType] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [tiers, setTiers] = useState([{ min: 1, max: 1, discount: 0 }])
  const [conditions, setConditions] = useState<string[]>([])

  const addTier = () => {
    setTiers([...tiers, { min: 1, max: 1, discount: 0 }])
  }

  const removeTier = (index: number) => {
    setTiers(tiers.filter((_, i) => i !== index))
  }

  const updateTier = (index: number, field: keyof (typeof tiers)[0], value: number) => {
    const updated = [...tiers]
    updated[index][field] = value
    setTiers(updated)
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
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Settings</TabsTrigger>
          <TabsTrigger value="conditions">Conditions</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rule Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Rule Name</Label>
                  <Input id="name" placeholder="Enter rule name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Rule Type</Label>
                  <Select value={ruleType} onValueChange={setRuleType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rule type" />
                    </SelectTrigger>
                    <SelectContent>
                      {ruleTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter rule description" className="min-h-[80px]" />
              </div>
            </CardContent>
          </Card>

          {ruleType === "percentage" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Percentage Discount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="percentage">Discount Percentage</Label>
                    <div className="relative">
                      <Input id="percentage" type="number" placeholder="0" className="pr-8" />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="max-discount">Maximum Discount (৳)</Label>
                    <Input id="max-discount" type="number" placeholder="No limit" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {ruleType === "fixed" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fixed Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (৳)</Label>
                  <Input id="amount" type="number" placeholder="0" />
                </div>
              </CardContent>
            </Card>
          )}

          {ruleType === "tiered" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tiered Pricing</CardTitle>
                <CardDescription>Set different discounts based on quantity ranges</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tiers.map((tier, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <div>
                        <Label className="text-xs">Min Qty</Label>
                        <Input
                          type="number"
                          value={tier.min}
                          onChange={(e) => updateTier(index, "min", Number.parseInt(e.target.value) || 0)}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Max Qty</Label>
                        <Input
                          type="number"
                          value={tier.max}
                          onChange={(e) => updateTier(index, "max", Number.parseInt(e.target.value) || 0)}
                          className="h-8"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Discount %</Label>
                        <Input
                          type="number"
                          value={tier.discount}
                          onChange={(e) => updateTier(index, "discount", Number.parseInt(e.target.value) || 0)}
                          className="h-8"
                        />
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => removeTier(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" onClick={addTier}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tier
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Applicable Categories</CardTitle>
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
        </TabsContent>

        <TabsContent value="conditions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Rule Conditions</CardTitle>
              <CardDescription>Set conditions for when this rule should apply</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-order">Minimum Order Value (৳)</Label>
                  <Input id="min-order" type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-order">Maximum Order Value (৳)</Label>
                  <Input id="max-order" type="number" placeholder="No limit" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="min-qty">Minimum Quantity</Label>
                  <Input id="min-qty" type="number" placeholder="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usage-limit">Usage Limit per Customer</Label>
                  <Input id="usage-limit" type="number" placeholder="Unlimited" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="first-time" />
                  <Label htmlFor="first-time">First-time customers only</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="emi-only" />
                  <Label htmlFor="emi-only">EMI purchases only</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="combine" />
                  <Label htmlFor="combine">Can combine with other offers</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Schedule Settings</CardTitle>
              <CardDescription>Set when this pricing rule should be active</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="always-active" />
                <Label htmlFor="always-active">Always Active</Label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <div className="relative">
                    <Input id="start-date" type="date" />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <div className="relative">
                    <Input id="end-date" type="date" />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Active Days</Label>
                <div className="flex space-x-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <Button key={day} variant="outline" size="sm" className="w-12 bg-transparent">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input id="start-time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-time">End Time</Label>
                  <Input id="end-time" type="time" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Save as Draft</Button>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Create Rule</Button>
      </div>
    </div>
  )
}
