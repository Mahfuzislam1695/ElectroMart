"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Heart,
  ShoppingCart,
  Trash2,
  Share2,
  Mail,
  Facebook,
  Twitter,
  Bell,
  BellOff,
  ArrowLeft,
  Star,
  TrendingDown,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [shareEmail, setShareEmail] = useState("")
  const [priceAlerts, setPriceAlerts] = useState<Record<string, boolean>>({})

  const moveToCart = (item: any) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
    })
    removeFromWishlist(item.id)
  }

  const togglePriceAlert = (itemId: string) => {
    setPriceAlerts((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }))
  }

  const shareViaEmail = () => {
    if (!shareEmail) return

    const subject = "Check out my wishlist from ElectroMart"
    const body = `I've created a wishlist with some amazing products:\n\n${wishlistItems
      .map((item) => `• ${item.name} - ৳${item.price.toLocaleString()}`)
      .join("\n")}\n\nVisit ElectroMart to see more!`

    window.location.href = `mailto:${shareEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setShareEmail("")
  }

  const shareOnSocial = (platform: "facebook" | "twitter") => {
    const url = window.location.href
    const text = `Check out my wishlist with ${wishlistItems.length} amazing products from ElectroMart!`

    if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank")
    } else {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        "_blank",
      )
    }
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-glass-bg-light to-glass-bg-dark">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <Heart className="w-16 h-16 text-glass-text-secondary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-glass-text-primary mb-4">Your Wishlist is Empty</h1>
            <p className="text-glass-text-secondary mb-8">Save your favorite products to buy them later</p>
            <Link href="/categories">
              <Button className="glass-button-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-glass-bg-light to-glass-bg-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-glass-text-primary mb-2">My Wishlist</h1>
          <p className="text-glass-text-secondary">{wishlistItems.length} item(s) saved for later</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wishlist Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid gap-4">
              {wishlistItems.map((item) => (
                <Card key={item.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-32 h-32 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                        {item.priceChanged && (
                          <Badge className="absolute -top-2 -right-2 glass-badge-success">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Price Drop!
                          </Badge>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-semibold text-glass-text-primary hover:text-glass-accent-primary transition-colors">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-glass-text-secondary">Brand: {item.brand}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{item.rating}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                          <span className="text-xl font-bold text-glass-accent-primary">
                            ৳{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && item.originalPrice > item.price && (
                            <>
                              <span className="text-sm text-glass-text-secondary line-through">
                                ৳{item.originalPrice.toLocaleString()}
                              </span>
                              <Badge className="glass-badge-success">
                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                              </Badge>
                            </>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                          <span className={`text-sm ${item.inStock ? "text-green-600" : "text-red-600"}`}>
                            {item.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>

                        {/* Added Date */}
                        <p className="text-xs text-glass-text-secondary">
                          Added on {new Date(item.addedDate).toLocaleDateString()}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Button
                            className="glass-button-primary flex-1"
                            disabled={!item.inStock}
                            onClick={() => moveToCart(item)}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Move to Cart
                          </Button>

                          <Button
                            variant="outline"
                            className="glass-button-secondary bg-transparent"
                            onClick={() => togglePriceAlert(item.id)}
                          >
                            {priceAlerts[item.id] ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                          </Button>

                          <Button
                            variant="outline"
                            className="glass-button-secondary bg-transparent text-red-500 hover:text-red-600"
                            onClick={() => removeFromWishlist(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Wishlist Summary */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-glass-text-primary">Wishlist Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-glass-text-secondary">Total Items:</span>
                  <span className="font-semibold text-glass-text-primary">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-glass-text-secondary">Total Value:</span>
                  <span className="font-semibold text-glass-accent-primary">
                    ৳{wishlistItems.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-glass-text-secondary">In Stock:</span>
                  <span className="font-semibold text-green-600">
                    {wishlistItems.filter((item) => item.inStock).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-glass-text-secondary">Price Alerts:</span>
                  <span className="font-semibold text-glass-accent-primary">
                    {Object.values(priceAlerts).filter(Boolean).length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Share Wishlist */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-glass-text-primary">
                  <Share2 className="w-5 h-5" />
                  Share Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Email Sharing */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-glass-text-primary">Share via Email</label>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="Enter email address"
                      value={shareEmail}
                      onChange={(e) => setShareEmail(e.target.value)}
                      className="glass-input flex-1"
                    />
                    <Button size="sm" className="glass-button-primary" onClick={shareViaEmail} disabled={!shareEmail}>
                      <Mail className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Social Media Sharing */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-glass-text-primary">Share on Social Media</label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-button-secondary bg-transparent flex-1"
                      onClick={() => shareOnSocial("facebook")}
                    >
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="glass-button-secondary bg-transparent flex-1"
                      onClick={() => shareOnSocial("twitter")}
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Price Alert Settings */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-glass-text-primary">
                  <Bell className="w-5 h-5" />
                  Price Alert Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-glass-text-secondary">
                  Get notified when prices drop on your wishlist items
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-glass-text-primary">Email notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" defaultChecked />
                    <span className="text-sm text-glass-text-primary">SMS notifications</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm text-glass-text-primary">Push notifications</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
