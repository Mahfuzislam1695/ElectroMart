import { FeaturedCategories } from "@/components/featured-categories"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-gray-900 font-medium">Categories</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Categories</h1>
          <p className="text-lg text-muted-foreground">Browse all our product categories</p>
        </div>

        <FeaturedCategories />
      </div>
    </div>
  )
}
