"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Eye, FolderTree, Tags, Building2 } from "lucide-react"
import { CategoryForm } from "@/components/admin/category-form"
import { AttributeForm } from "@/components/admin/attribute-form"
import { BrandForm } from "@/components/admin/brand-form"
import { CategoryTree } from "@/components/admin/category-tree"

const categories = [
  {
    id: "1",
    name: "Air Conditioners",
    slug: "air-conditioners",
    parent: null,
    products: 156,
    status: "active",
    attributes: ["Tonnage", "Energy Rating", "Type"],
  },
  {
    id: "2",
    name: "Split AC",
    slug: "split-ac",
    parent: "Air Conditioners",
    products: 89,
    status: "active",
    attributes: ["Tonnage", "Energy Rating"],
  },
  {
    id: "3",
    name: "Window AC",
    slug: "window-ac",
    parent: "Air Conditioners",
    products: 67,
    status: "active",
    attributes: ["Tonnage", "Energy Rating"],
  },
  {
    id: "4",
    name: "Refrigerators",
    slug: "refrigerators",
    parent: null,
    products: 134,
    status: "active",
    attributes: ["Capacity", "Type", "Energy Rating"],
  },
]

const attributes = [
  {
    id: "1",
    name: "Tonnage",
    type: "select",
    options: ["1 Ton", "1.5 Ton", "2 Ton", "2.5 Ton"],
    categories: ["Air Conditioners"],
    required: true,
  },
  {
    id: "2",
    name: "Energy Rating",
    type: "select",
    options: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
    categories: ["Air Conditioners", "Refrigerators"],
    required: true,
  },
  {
    id: "3",
    name: "Capacity",
    type: "range",
    min: 100,
    max: 800,
    unit: "L",
    categories: ["Refrigerators"],
    required: true,
  },
]

const brands = [
  {
    id: "1",
    name: "Samsung",
    logo: "/samsung-logo.png",
    categories: ["Air Conditioners", "Refrigerators", "Smart TVs"],
    products: 245,
    rating: 4.5,
    status: "active",
  },
  {
    id: "2",
    name: "LG",
    logo: "/lg-logo.png",
    categories: ["Air Conditioners", "Refrigerators", "Washing Machines"],
    products: 189,
    rating: 4.3,
    status: "active",
  },
  {
    id: "3",
    name: "Sony",
    logo: "/sony-logo.png",
    categories: ["Smart TVs", "Mobile Phones"],
    products: 156,
    rating: 4.6,
    status: "active",
  },
]

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("categories")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredAttributes = attributes.filter((attribute) =>
    attribute.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Category & Attribute Management</h1>
          <p className="text-gray-600 mt-1">Organize your product catalog structure</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Categories</CardTitle>
            <FolderTree className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">24</div>
            <p className="text-xs text-blue-600 mt-1">8 main categories</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Attributes</CardTitle>
            <Tags className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">18</div>
            <p className="text-xs text-green-600 mt-1">Filterable attributes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Brands</CardTitle>
            <Building2 className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">45</div>
            <p className="text-xs text-purple-600 mt-1">Active brands</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Catalog Management</CardTitle>
              <CardDescription>Manage categories, attributes, and brands</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="attributes">Attributes</TabsTrigger>
              <TabsTrigger value="brands">Brands</TabsTrigger>
            </TabsList>

            <TabsContent value="categories" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Category Hierarchy</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                      <DialogDescription>Create a new product category</DialogDescription>
                    </DialogHeader>
                    <CategoryForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Category Tree</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CategoryTree categories={categories} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Category Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Products</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCategories.map((category) => (
                          <TableRow key={category.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{category.name}</div>
                                {category.parent && (
                                  <div className="text-sm text-gray-500">Parent: {category.parent}</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{category.products}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">{category.status}</Badge>
                            </TableCell>
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
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Products
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Category
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="attributes" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Product Attributes</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Attribute
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Attribute</DialogTitle>
                      <DialogDescription>Create a new product attribute</DialogDescription>
                    </DialogHeader>
                    <AttributeForm />
                  </DialogContent>
                </Dialog>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Attribute Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Categories</TableHead>
                    <TableHead>Required</TableHead>
                    <TableHead>Options</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttributes.map((attribute) => (
                    <TableRow key={attribute.id}>
                      <TableCell className="font-medium">{attribute.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{attribute.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {attribute.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {attribute.required ? (
                          <Badge className="bg-red-100 text-red-800">Required</Badge>
                        ) : (
                          <Badge variant="secondary">Optional</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {attribute.type === "select" && attribute.options && (
                          <div className="text-sm text-gray-600">
                            {attribute.options.slice(0, 2).join(", ")}
                            {attribute.options.length > 2 && "..."}
                          </div>
                        )}
                        {attribute.type === "range" && (
                          <div className="text-sm text-gray-600">
                            {attribute.min} - {attribute.max} {attribute.unit}
                          </div>
                        )}
                      </TableCell>
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
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Attribute
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="brands" className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Brand Management</h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Brand
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Add New Brand</DialogTitle>
                      <DialogDescription>Add a new brand to your catalog</DialogDescription>
                    </DialogHeader>
                    <BrandForm />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredBrands.map((brand) => (
                  <Card key={brand.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{brand.name}</h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-gray-600">Rating: {brand.rating}</span>
                            <Badge className="bg-green-100 text-green-800">{brand.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Products: {brand.products}</div>
                        <div className="flex flex-wrap gap-1">
                          {brand.categories.slice(0, 2).map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                          {brand.categories.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{brand.categories.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end mt-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Products
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Brand
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
