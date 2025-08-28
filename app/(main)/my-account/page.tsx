"use client"

import { useState } from "react"
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Star,
  Download,
  Edit,
  Trash2,
  Plus,
  Eye,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Order {
  id: string
  date: string
  status: string
  total: string
  items: number
}

interface WishlistItem {
  id: string
  name: string
  image: string
  price: string
  originalPrice?: string
  inStock: boolean
  priceChanged?: boolean
}

interface Address {
  id: string
  type: string
  name: string
  address: string
  phone: string
  isDefault: boolean
}

interface PaymentMethod {
  id: string
  type: string
  last4: string
  expiry: string
  isDefault: boolean
}

interface Review {
  id: string
  productName: string
  rating: number
  comment: string
  date: string
  status: "published" | "pending"
}

const mockOrders: Order[] = [
  { id: "EM1703123456789", date: "Dec 20, 2024", status: "Out for Delivery", total: "৳45,999", items: 1 },
  { id: "EM1702987654321", date: "Dec 15, 2024", status: "Delivered", total: "৳89,999", items: 2 },
  { id: "EM1701234567890", date: "Dec 10, 2024", status: "Delivered", total: "৳25,999", items: 1 },
]

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    name: 'Samsung 43" 4K Smart TV',
    image: "/sony-4k-tv-black-modern.png",
    price: "৳65,999",
    originalPrice: "৳75,999",
    inStock: true,
    priceChanged: true,
  },
  {
    id: "2",
    name: "LG Double Door Refrigerator",
    image: "/samsung-refrigerator-silver-modern.png",
    price: "৳89,999",
    inStock: false,
  },
]

const mockAddresses: Address[] = [
  {
    id: "1",
    type: "Home",
    name: "John Doe",
    address: "House 123, Road 15, Block C, Bashundhara R/A, Dhaka 1229",
    phone: "+880 1700-000000",
    isDefault: true,
  },
  {
    id: "2",
    type: "Office",
    name: "John Doe",
    address: "Level 10, Building 5, Gulshan Avenue, Gulshan 1, Dhaka 1212",
    phone: "+880 1700-000000",
    isDefault: false,
  },
]

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    type: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
]

const mockReviews: Review[] = [
  {
    id: "1",
    productName: "LG 1.5 Ton Inverter AC",
    rating: 5,
    comment: "Excellent cooling performance and energy efficient. Highly recommended!",
    date: "Dec 18, 2024",
    status: "published",
  },
  {
    id: "2",
    productName: "Samsung Refrigerator",
    rating: 4,
    comment: "Good build quality but could be quieter.",
    date: "Dec 12, 2024",
    status: "pending",
  },
]

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [isEditing, setIsEditing] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "glass-badge-success"
      case "out for delivery":
        return "glass-badge-primary"
      case "processing":
        return "glass-badge-warning"
      default:
        return "glass-badge-secondary"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-bg-light to-glass-bg-dark">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-glass-text-primary mb-2">My Account</h1>
          <p className="text-glass-text-secondary">Manage your account settings and view your order history</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card p-1 grid w-full grid-cols-7">
            <TabsTrigger value="dashboard" className="glass-tab">
              <User className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="orders" className="glass-tab">
              <Package className="w-4 h-4 mr-2" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="glass-tab">
              <Heart className="w-4 h-4 mr-2" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="addresses" className="glass-tab">
              <MapPin className="w-4 h-4 mr-2" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="payments" className="glass-tab">
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="profile" className="glass-tab">
              <Settings className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="reviews" className="glass-tab">
              <Star className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-glass-text-primary">{mockOrders.length}</p>
                      <p className="text-sm text-glass-text-secondary">Total Orders</p>
                    </div>
                    <Package className="w-8 h-8 text-glass-accent-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-glass-text-primary">{mockWishlist.length}</p>
                      <p className="text-sm text-glass-text-secondary">Wishlist Items</p>
                    </div>
                    <Heart className="w-8 h-8 text-glass-accent-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-glass-text-primary">{mockReviews.length}</p>
                      <p className="text-sm text-glass-text-secondary">Reviews Written</p>
                    </div>
                    <Star className="w-8 h-8 text-glass-accent-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.slice(0, 3).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 glass-card rounded-lg">
                      <div>
                        <p className="font-semibold text-glass-text-primary">#{order.id}</p>
                        <p className="text-sm text-glass-text-secondary">
                          {order.date} • {order.items} item(s)
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        <p className="text-sm font-semibold text-glass-text-primary mt-1">{order.total}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Order History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 glass-card rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="font-semibold text-glass-text-primary">#{order.id}</p>
                            <p className="text-sm text-glass-text-secondary">{order.date}</p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-glass-text-secondary mt-2">
                          {order.items} item(s) • {order.total}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="glass-button-secondary bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="glass-button-secondary bg-transparent">
                          <Download className="w-4 h-4 mr-1" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist */}
          <TabsContent value="wishlist" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">My Wishlist</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockWishlist.map((item) => (
                    <div key={item.id} className="flex space-x-4 p-4 glass-card rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-glass-text-primary">{item.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="font-bold text-glass-accent-primary">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-glass-text-secondary line-through">{item.originalPrice}</span>
                          )}
                          {item.priceChanged && <Badge className="glass-badge-success text-xs">Price Drop!</Badge>}
                        </div>
                        <div className="flex space-x-2 mt-3">
                          <Button size="sm" className="glass-button-primary" disabled={!item.inStock}>
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            {item.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                          <Button variant="outline" size="sm" className="glass-button-secondary bg-transparent">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses */}
          <TabsContent value="addresses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-glass-text-primary">Saved Addresses</h2>
              <Button className="glass-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add New Address
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {mockAddresses.map((address) => (
                <Card key={address.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge className="glass-badge-secondary">{address.type}</Badge>
                        {address.isDefault && <Badge className="glass-badge-primary">Default</Badge>}
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-glass-text-primary">{address.name}</p>
                      <p className="text-sm text-glass-text-secondary mt-1">{address.address}</p>
                      <p className="text-sm text-glass-text-secondary">{address.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Payment Methods */}
          <TabsContent value="payments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-glass-text-primary">Payment Methods</h2>
              <Button className="glass-button-primary">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>

            <div className="space-y-4">
              {mockPaymentMethods.map((method) => (
                <Card key={method.id} className="glass-card">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{method.type}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-glass-text-primary">•••• •••• •••• {method.last4}</p>
                          <p className="text-sm text-glass-text-secondary">Expires {method.expiry}</p>
                        </div>
                        {method.isDefault && <Badge className="glass-badge-primary">Default</Badge>}
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="glass-button-secondary bg-transparent">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="glass-button-secondary bg-transparent">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" className="glass-input" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" className="glass-input" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john.doe@example.com" className="glass-input" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="+880 1700-000000" className="glass-input" />
                </div>
                <Button className="glass-button-primary">Update Profile</Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Communication Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-glass-text-primary">Email Notifications</p>
                    <p className="text-sm text-glass-text-secondary">Receive order updates and promotions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-glass-text-primary">SMS Notifications</p>
                    <p className="text-sm text-glass-text-secondary">Receive delivery updates via SMS</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-glass-text-primary">Marketing Communications</p>
                    <p className="text-sm text-glass-text-secondary">Receive promotional offers and deals</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" className="glass-input" />
                </div>
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" className="glass-input" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" className="glass-input" />
                </div>
                <Button className="glass-button-primary">Change Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">My Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="p-4 glass-card rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-glass-text-primary">{review.productName}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-glass-text-secondary">{review.date}</span>
                            <Badge
                              className={review.status === "published" ? "glass-badge-success" : "glass-badge-warning"}
                            >
                              {review.status}
                            </Badge>
                          </div>
                        </div>
                        {review.status === "pending" && (
                          <Button variant="outline" size="sm" className="glass-button-secondary bg-transparent">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        )}
                      </div>
                      <p className="text-glass-text-secondary">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
