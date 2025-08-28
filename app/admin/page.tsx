"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  AlertTriangle,
  Eye,
  RefreshCw,
} from "lucide-react"

const salesData = [
  { name: "Mon", sales: 4000, orders: 24 },
  { name: "Tue", sales: 3000, orders: 18 },
  { name: "Wed", sales: 5000, orders: 32 },
  { name: "Thu", sales: 4500, orders: 28 },
  { name: "Fri", sales: 6000, orders: 38 },
  { name: "Sat", sales: 7500, orders: 45 },
  { name: "Sun", sales: 5500, orders: 35 },
]

const categoryData = [
  { name: "Air Conditioners", value: 35, color: "#3b82f6" },
  { name: "Refrigerators", value: 25, color: "#10b981" },
  { name: "Smart TVs", value: 20, color: "#f59e0b" },
  { name: "Mobile Phones", value: 15, color: "#ef4444" },
  { name: "Others", value: 5, color: "#8b5cf6" },
]

const topProducts = [
  { name: "Samsung 1.5 Ton Inverter AC", sales: 156, revenue: "৳7,80,000", trend: "up" },
  { name: "LG 260L Refrigerator", sales: 134, revenue: "৳6,70,000", trend: "up" },
  { name: 'Sony 55" 4K Smart TV', sales: 89, revenue: "৳8,90,000", trend: "down" },
  { name: "iPhone 15 Pro Max", sales: 67, revenue: "৳10,05,000", trend: "up" },
]

const alerts = [
  { type: "stock", message: "Samsung Galaxy S24 - Low Stock (5 units)", priority: "high" },
  { type: "order", message: "Order #ORD-2024-001 requires attention", priority: "medium" },
  { type: "system", message: "Payment gateway maintenance scheduled", priority: "low" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">৳45,23,100</div>
            <div className="flex items-center text-xs text-blue-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">1,234</div>
            <div className="flex items-center text-xs text-green-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Active Customers</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">8,567</div>
            <div className="flex items-center text-xs text-purple-600 mt-1">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Products</CardTitle>
            <Package className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-900">2,456</div>
            <div className="flex items-center text-xs text-red-600 mt-1">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Daily sales and order trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Revenue distribution across product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Best performing products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50/50">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.sales} units sold</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{product.revenue}</div>
                    <div
                      className={`flex items-center text-xs ${
                        product.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {product.trend === "up" ? (
                        <TrendingUp className="mr-1 h-3 w-3" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3" />
                      )}
                      {product.trend === "up" ? "+5.2%" : "-2.1%"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>System Alerts</CardTitle>
            <CardDescription>Important notifications requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg ${
                    alert.priority === "high"
                      ? "bg-red-50 border border-red-200"
                      : alert.priority === "medium"
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-blue-50 border border-blue-200"
                  }`}
                >
                  <AlertTriangle
                    className={`h-4 w-4 mt-0.5 ${
                      alert.priority === "high"
                        ? "text-red-500"
                        : alert.priority === "medium"
                          ? "text-amber-500"
                          : "text-blue-500"
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{alert.message}</div>
                    <Badge
                      variant={
                        alert.priority === "high"
                          ? "destructive"
                          : alert.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="mt-1 text-xs"
                    >
                      {alert.priority} priority
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
