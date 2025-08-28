import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface CategoryBreadcrumbProps {
  categoryName: string
}

export default function CategoryBreadcrumb({ categoryName }: CategoryBreadcrumbProps) {
  return (
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
          <li>
            <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
              Categories
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li className="text-gray-900 font-medium">{categoryName}</li>
        </ol>
      </div>
    </nav>
  )
}
