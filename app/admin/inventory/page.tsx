"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Search,
  Filter,
  Download,
  Upload,
  MoreHorizontal,
  Edit,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Plus,
  Minus,
} from "lucide-react"
import { StockAdjustmentForm } from "@/components/admin/stock-adjustment-form"
import { PricingRulesForm } from "@/components/admin/pricing-rules-form"

const inventoryData = [
  {
    id: "1",
    sku: "SAM-AC-001",
    name: "Samsung 1.5 Ton Inverter AC",
    category: "Air Conditioners",
    currentStock: 25,
    reservedStock: 3,
    availableStock: 22,
    reorderLevel: 10,
    maxStock: 100,
    avgCost: 45000,
    lastUpdated: "2024-01-15",
    status: "in-stock",
    movements: [
      { date: "2024-01-15", type: "sale", quantity: -2, reason: "Order #ORD-001" },
      { date: "2024-01-14", type: "purchase", quantity: 10, reason: "Restock" },
    ],
  },
  {
    id: "2",
    sku: "LG-REF-001",
    name: "LG 260L Refrigerator",
    category: "Refrigerators",
    currentStock: 5,
    reservedStock: 2,
    availableStock: 3,
    reorderLevel: 8,
    maxStock: 50,
    avgCost: 32000,
    lastUpdated: "2024-01-14",
    status: "low-stock",
    movements: [
      { date: "2024-01-14", type: "sale", quantity: -3, reason: "Order #ORD-002" },
      { date: "2024-01-13", type: "adjustment", quantity: -2, reason: "Damaged items" },
    ],
  },
  {
    id: "3",
    sku: "SONY-TV-001",
    name: 'Sony 55" 4K Smart TV',
    category: "Smart TVs",
    currentStock: 0,
    reservedStock: 0,
    availableStock: 0,
    reorderLevel: 5,
    maxStock: 30,
    avgCost: 75000,
    lastUpdated: "2024-01-13",
    status: "out-of-stock",
    movements: [
      { date: "2024-01-13", type: "sale", quantity: -1, reason: "Order #ORD-003" },
      { date: "2024-01-12", type: "sale", quantity: -2, reason: "Bulk order" },
    ],
  },
]

const pricingRules = [
  {
    id: "1",
    name: "Seasonal Discount - Summer ACs",
    type: "percentage",
    value: 15,
    categories: ["Air Conditioners"],
    startDate: "2024-03-01",
    endDate: "2024-05-31",
    status: "active",
    productsAffected: 45,
  },
  {
    id: "2",
    name: "Bulk Purchase Discount",
    type: "tiered",
    tiers: [
      { min: 2, max: 4, discount: 5 },
      { min: 5, max: 9, discount: 10 },
      { min: 10, max: null, discount: 15 },
    ],
    categories: ["All"],
    status: "active",
    productsAffected: 234,
  },
  {
    id: "3",
    name: "EMI Processing Fee",
    type: "fixed",
    value: 500,
    categories: ["All"],
    condition: "EMI purchases only",
    status: "active",
    productsAffected: 189,
  },
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStockStatus = (item: any) => {
    if (item.currentStock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>
    } else if (item.currentStock <= item.reorderLevel) {
      return <Badge className="bg-amber-100 text-amber-800">Low Stock</Badge>
    }
    return <Badge className="bg-green-100 text-green-800">In Stock</Badge>
  }

  const getStockLevel = (current: number, max: number) => {
    return (current / max) * 100
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory & Pricing Management</h1>
          <p className="text-gray-600 mt-1">Monitor stock levels and manage pricing strategies</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Inventory
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Products</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">2,456</div>
            <p className="text-xs text-blue-600 mt-1">Across all categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">In Stock</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">2,234</div>
            <p className="text-xs text-green-600 mt-1">91% availability</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">45</div>
            <p className="text-xs text-amber-600 mt-1">Needs reordering</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-700">Out of Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">12</div>
            <p className="text-xs text-red-600 mt-1">Immediate action needed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Inventory & Pricing</CardTitle>
              <CardDescription>Manage stock levels and pricing strategies</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inventory..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="inventory" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="inventory">Inventory Tracking</TabsTrigger>
              <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
              <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="inventory" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Stock Management</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Stock Adjustment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Stock Adjustment</DialogTitle>
                      <DialogDescription>Adjust inventory levels for products</DialogDescription>
                    </DialogHeader>
                    <StockAdjustmentForm />
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <input type="checkbox" className="rounded" />
                    </TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Reserved</TableHead>
                    <TableHead>Stock Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <input type="checkbox" className="rounded" />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.category}</div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                      <TableCell>
                        <div className="font-medium">{item.currentStock}</div>
                        <div className="text-xs text-gray-500">Max: {item.maxStock}</div>
                      </TableCell>
                      <TableCell>{item.availableStock}</TableCell>
                      <TableCell>{item.reservedStock}</TableCell>
                      <TableCell>
                        <div className="w-full">
                          <Progress value={getStockLevel(item.currentStock, item.maxStock)} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">
                            {Math.round(getStockLevel(item.currentStock, item.maxStock))}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStockStatus(item)}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Plus className="mr-2 h-4 w-4" />
                              Add Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Minus className="mr-2 h-4 w-4" />
                              Remove Stock
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View History</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pricing" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Pricing Rules</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Create Rule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Create Pricing Rule</DialogTitle>
                      <DialogDescription>Set up automated pricing rules and discounts</DialogDescription>
                    </DialogHeader>
                    <PricingRulesForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {pricingRules.map((rule) => (
                  <Card key={rule.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h4 className="font-medium">{rule.name}</h4>
                            <Badge className="bg-green-100 text-green-800">{rule.status}</Badge>
                            <Badge variant="outline">{rule.type}</Badge>
                          </div>
                          <div className="mt-2 text-sm text-gray-600">
                            {rule.type === "percentage" && `${rule.value}% discount`}
                            {rule.type === "fixed" && `৳${rule.value} ${rule.condition || "fee"}`}
                            {rule.type === "tiered" && "Multiple discount tiers"}
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            Affects {rule.productsAffected} products
                            {rule.startDate && rule.endDate && (
                              <span>
                                {" "}
                                • Valid: {rule.startDate} to {rule.endDate}
                              </span>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Rule
                            </DropdownMenuItem>
                            <DropdownMenuItem>View Products</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Duplicate</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Inventory Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <span>12 products are out of stock</span>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                    <Alert>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <span>45 products below reorder level</span>
                          <Button variant="outline" size="sm">
                            Create PO
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Upload className="mr-2 h-4 w-4" />
                      Bulk Stock Update
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="mr-2 h-4 w-4" />
                      Export Inventory Report
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync with Suppliers
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
