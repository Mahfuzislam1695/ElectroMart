"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface Product {
  id: string
  name: string
  image: string
  price: number
  originalPrice?: number
  rating: number
  brand: string
  specifications: Record<string, string>
  inStock: boolean
}

interface CompareContextType {
  compareProducts: Product[]
  addToCompare: (product: Product) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  isInCompare: (productId: string) => boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareProducts, setCompareProducts] = useState<Product[]>([])

  const addToCompare = (product: Product) => {
    setCompareProducts((prev) => {
      if (prev.length >= 4) return prev // Max 4 products
      if (prev.find((p) => p.id === product.id)) return prev // Already exists
      return [...prev, product]
    })
  }

  const removeFromCompare = (productId: string) => {
    setCompareProducts((prev) => prev.filter((p) => p.id !== productId))
  }

  const clearCompare = () => {
    setCompareProducts([])
  }

  const isInCompare = (productId: string) => {
    return compareProducts.some((p) => p.id === productId)
  }

  return (
    <CompareContext.Provider value={{ compareProducts, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}
