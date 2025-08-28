import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface ProductBreadcrumbProps {
  category: string
  categorySlug: string
  productName: string
}

export default function ProductBreadcrumb({ category, categorySlug, productName }: ProductBreadcrumbProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href="/" className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li>
            <Link href={`/category/${categorySlug}`} className="text-gray-500 hover:text-blue-600 transition-colors">
              {category}
            </Link>
          </li>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <li className="text-gray-900 font-medium truncate max-w-md">{productName}</li>
        </ol>
      </div>
    </nav>
  )
}
