import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Home, Search } from "lucide-react"

export default function CategoryNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="glass-card p-8 rounded-2xl">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Category Not Found</h1>
            <p className="text-gray-600 mb-6">
              The category you're looking for doesn't exist. Please check the URL or browse our available categories.
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <Link href="/categories">
              <Button className="w-full">
                <Search className="w-4 h-4 mr-2" />
                Browse All Categories
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Available Categories:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link href="/category/air-conditioners" className="text-blue-600 hover:underline">
                Air Conditioners
              </Link>
              <Link href="/category/refrigerators" className="text-blue-600 hover:underline">
                Refrigerators
              </Link>
              <Link href="/category/smart-tvs" className="text-blue-600 hover:underline">
                Smart TVs
              </Link>
              <Link href="/category/washing-machines" className="text-blue-600 hover:underline">
                Washing Machines
              </Link>
              <Link href="/category/microwave-ovens" className="text-blue-600 hover:underline">
                Microwave Ovens
              </Link>
              <Link href="/category/mobile-phones" className="text-blue-600 hover:underline">
                Mobile Phones
              </Link>
              <Link href="/category/laptops" className="text-blue-600 hover:underline">
                Laptops
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
