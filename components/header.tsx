"use client"
import { Menu, ShoppingCart, User, Heart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCompare } from "@/contexts/compare-context"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IntelligentSearch } from "@/components/intelligent-search"

const categories = [
  { name: "Air Conditioners", slug: "air-conditioners" },
  { name: "Refrigerators", slug: "refrigerators" },
  { name: "Smart TVs", slug: "smart-tvs" },
  { name: "Washing Machines", slug: "washing-machines" },
  { name: "Microwave Ovens", slug: "microwave-ovens" },
  { name: "Mobile Phones", slug: "mobile-phones" },
  { name: "Laptops", slug: "laptops" },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false)
  const { state: cartState } = useCart()
  const { wishlistItems } = useWishlist()
  const { compareProducts } = useCompare()
  const router = useRouter()

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 glass border-b">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="hidden md:flex items-center justify-between py-2 text-sm border-b border-border/50">
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">📞 +880 1234-567890</span>
            <span className="text-muted-foreground">📧 info@electromart.bd</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/order-tracking" className="hover:text-primary transition-colors">
              Track Order
            </Link>
            <Link href="/my-account" className="hover:text-primary transition-colors">
              My Account
            </Link>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
            <Link href="/">
              <h1 className="text-xl font-bold text-primary">ElectroMart</h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button
                className="flex items-center gap-1 hover:text-primary transition-colors"
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
              >
                Categories <ChevronDown className="h-4 w-4" />
              </button>
              {isCategoriesOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-64 glass-card rounded-lg shadow-lg p-4 grid grid-cols-1 gap-2"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/category/${category.slug}`}
                      className="block px-3 py-2 rounded-md hover:bg-accent transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/categories" className="hover:text-primary transition-colors">
              All Categories
            </Link>
          </nav>

          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <IntelligentSearch
              placeholder="Search for electronics... (e.g., 1.5 ton AC under 50,000 BDT)"
              className="w-full"
              onSearch={handleSearch}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Link href="/compare">
              <Button variant="ghost" size="icon" className="relative">
                <div className="flex items-center justify-center w-5 h-5">
                  <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
                </div>
                {compareProducts.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {compareProducts.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {wishlistItems.length}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartState.itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {cartState.itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Link href="/my-account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="md:hidden pb-4">
          <IntelligentSearch placeholder="Search electronics..." className="w-full" onSearch={handleSearch} />
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 glass-card border-t">
            <div className="p-4 space-y-4">
              <Link
                href="/"
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/categories"
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Categories
              </Link>
              <div className="space-y-2">
                <p className="font-medium text-sm text-muted-foreground">Categories</p>
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/category/${category.slug}`}
                    className="block py-1 pl-4 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <Link
                  href="/order-tracking"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Track Order
                </Link>
                <Link
                  href="/my-account"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Account
                </Link>
                <Link
                  href="/compare"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Compare Products ({compareProducts.length})
                </Link>
                <Link
                  href="/wishlist"
                  className="block py-2 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Wishlist ({wishlistItems.length})
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
