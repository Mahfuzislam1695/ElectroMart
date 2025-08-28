"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WishlistItem {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  brand: string
  inStock: boolean
  priceChanged?: boolean
  addedDate: string
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (itemId: string) => void
  clearWishlist: () => void
  isInWishlist: (itemId: string) => boolean
  toggleWishlist: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "1",
      name: 'Samsung 43" 4K Smart TV',
      image: "/sony-4k-tv-black-modern.png",
      price: 65999,
      originalPrice: 75999,
      rating: 4.6,
      brand: "Samsung",
      inStock: true,
      priceChanged: true,
      addedDate: "2024-12-15",
    },
    {
      id: "2",
      name: "LG Double Door Refrigerator",
      image: "/samsung-refrigerator-silver-modern.png",
      price: 89999,
      rating: 4.3,
      brand: "LG",
      inStock: false,
      addedDate: "2024-12-10",
    },
  ])

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.find((p) => p.id === item.id)) return prev
      return [...prev, { ...item, addedDate: new Date().toISOString().split("T")[0] }]
    })
  }

  const removeFromWishlist = (itemId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId))
  }

  const clearWishlist = () => {
    setWishlistItems([])
  }

  const isInWishlist = (itemId: string) => {
    return wishlistItems.some((item) => item.id === itemId)
  }

  const toggleWishlist = (item: WishlistItem) => {
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
    } else {
      addToWishlist(item)
    }
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
