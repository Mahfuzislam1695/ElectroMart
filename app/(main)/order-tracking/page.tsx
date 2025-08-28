"use client"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderStatus {
  id: string
  status: "completed" | "current" | "pending"
  title: string
  description: string
  timestamp?: string
}

interface TrackingInfo {
  orderNumber: string
  orderDate: string
  total: string
  status: string
  estimatedDelivery: string
  carrier: string
  trackingNumber: string
  deliveryAddress: string
  items: Array<{
    name: string
    image: string
    quantity: number
    price: string
  }>
  statusHistory: OrderStatus[]
}

const mockTrackingData: TrackingInfo = {
  orderNumber: "EM1703123456789",
  orderDate: "December 20, 2024",
  total: "৳45,999",
  status: "Out for Delivery",
  estimatedDelivery: "December 22, 2024",
  carrier: "Sundarban Courier",
  trackingNumber: "SC123456789BD",
  deliveryAddress: "House 123, Road 15, Block C, Bashundhara R/A, Dhaka 1229",
  items: [
    {
      name: "LG 1.5 Ton Inverter AC",
      image: "/lg-air-conditioner-white-modern.png",
      quantity: 1,
      price: "৳45,999",
    },
  ],
  statusHistory: [
    {
      id: "1",
      status: "completed",
      title: "Order Placed",
      description: "Your order has been successfully placed",
      timestamp: "Dec 20, 2024 - 10:30 AM",
    },
    {
      id: "2",
      status: "completed",
      title: "Payment Confirmed",
      description: "Payment received and verified",
      timestamp: "Dec 20, 2024 - 10:35 AM",
    },
    {
      id: "3",
      status: "completed",
      title: "Order Processed",
      description: "Your order is being prepared for shipment",
      timestamp: "Dec 20, 2024 - 2:15 PM",
    },
    {
      id: "4",
      status: "completed",
      title: "Shipped",
      description: "Your order has been shipped",
      timestamp: "Dec 21, 2024 - 9:00 AM",
    },
    {
      id: "5",
      status: "current",
      title: "Out for Delivery",
      description: "Your order is out for delivery",
      timestamp: "Dec 22, 2024 - 8:00 AM",
    },
    {
      id: "6",
      status: "pending",
      title: "Delivered",
      description: "Order will be delivered to your address",
      timestamp: "Expected by 6:00 PM",
    },
  ],
}

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("")
  const [trackingData, setTrackingData] = useState<TrackingInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTrackOrder = async () => {
    if (!orderNumber.trim()) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (orderNumber === "EM1703123456789") {
        setTrackingData(mockTrackingData)
      } else {
        setTrackingData(null)
      }
      setIsLoading(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "current":
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-bg-light to-glass-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-glass-text-primary mb-2">Track Your Order</h1>
          <p className="text-glass-text-secondary">Enter your order number to track your shipment</p>
        </div>

        {/* Order Number Input */}
        <Card className="glass-card max-w-md mx-auto mb-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-glass-text-primary mb-2">Order Number</label>
                <Input
                  type="text"
                  placeholder="Enter your order number (e.g., EM1703123456789)"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  className="glass-input"
                />
              </div>
              <Button
                onClick={handleTrackOrder}
                disabled={isLoading || !orderNumber.trim()}
                className="w-full glass-button-primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Tracking...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Track Order
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Order Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Order Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-glass-text-secondary">Order Number:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.orderNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-glass-text-secondary">Order Date:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.orderDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-glass-text-secondary">Total Amount:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.total}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-glass-text-secondary">Current Status:</span>
                      <Badge className="ml-2 glass-badge-primary">{trackingData.status}</Badge>
                    </div>
                    <div>
                      <span className="text-sm text-glass-text-secondary">Estimated Delivery:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.estimatedDelivery}</p>
                    </div>
                    <div>
                      <span className="text-sm text-glass-text-secondary">Tracking Number:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.trackingNumber}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Timeline */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.statusHistory.map((status, index) => (
                    <div key={status.id} className="flex items-start space-x-4">
                      <div className="flex flex-col items-center">
                        {getStatusIcon(status.status)}
                        {index < trackingData.statusHistory.length - 1 && (
                          <div
                            className={`w-0.5 h-12 mt-2 ${
                              status.status === "completed" ? "bg-green-500" : "bg-gray-300"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3
                            className={`font-semibold ${
                              status.status === "current"
                                ? "text-blue-600"
                                : status.status === "completed"
                                  ? "text-green-600"
                                  : "text-glass-text-secondary"
                            }`}
                          >
                            {status.title}
                          </h3>
                          {status.timestamp && (
                            <span className="text-sm text-glass-text-secondary">{status.timestamp}</span>
                          )}
                        </div>
                        <p className="text-sm text-glass-text-secondary mt-1">{status.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Delivery Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-glass-text-primary flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-glass-text-secondary">{trackingData.deliveryAddress}</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-glass-text-primary flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Shipping Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="text-sm text-glass-text-secondary">Carrier:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.carrier}</p>
                    </div>
                    <div>
                      <span className="text-sm text-glass-text-secondary">Tracking ID:</span>
                      <p className="font-semibold text-glass-text-primary">{trackingData.trackingNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Items */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 glass-card rounded-lg">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-glass-text-primary">{item.name}</h4>
                        <p className="text-sm text-glass-text-secondary">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-glass-text-primary">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-glass-accent-primary" />
                    <div>
                      <p className="font-semibold text-glass-text-primary">Call Us</p>
                      <p className="text-sm text-glass-text-secondary">+880 1700-000000</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-glass-accent-primary" />
                    <div>
                      <p className="font-semibold text-glass-text-primary">Email Support</p>
                      <p className="text-sm text-glass-text-secondary">support@electromart.com</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-glass-border">
                  <Button variant="outline" className="glass-button-secondary bg-transparent">
                    View Return Policy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* No Results */}
        {orderNumber && !trackingData && !isLoading && (
          <Card className="glass-card max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <Package className="w-12 h-12 text-glass-text-secondary mx-auto mb-4" />
              <h3 className="font-semibold text-glass-text-primary mb-2">Order Not Found</h3>
              <p className="text-sm text-glass-text-secondary">
                Please check your order number and try again. If you continue to have issues, contact our support team.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
