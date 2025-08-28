import Link from "next/link"
import { ChevronRight, Home, Search } from "lucide-react"

interface SearchBreadcrumbProps {
  query: string
}

export default function SearchBreadcrumb({ query }: SearchBreadcrumbProps) {
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
          <li className="flex items-center text-gray-900 font-medium">
            <Search className="w-4 h-4 mr-1" />
            Search: "{query}"
          </li>
        </ol>
      </div>
    </nav>
  )
}
