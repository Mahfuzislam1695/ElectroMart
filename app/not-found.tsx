"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="glass-card p-8 rounded-2xl">
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong
              URL.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go to Homepage
              </Button>
            </Link>

            <Link href="/categories">
              <Button variant="outline" className="w-full bg-transparent">
                <Search className="w-4 h-4 mr-2" />
                Browse Categories
              </Button>
            </Link>

            <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-2">Popular Categories:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link href="/category/air-conditioners">
                <Button variant="ghost" size="sm" className="text-xs">
                  Air Conditioners
                </Button>
              </Link>
              <Link href="/category/refrigerators">
                <Button variant="ghost" size="sm" className="text-xs">
                  Refrigerators
                </Button>
              </Link>
              <Link href="/category/smart-tvs">
                <Button variant="ghost" size="sm" className="text-xs">
                  Smart TVs
                </Button>
              </Link>
              <Link href="/category/mobile-phones">
                <Button variant="ghost" size="sm" className="text-xs">
                  Mobile Phones
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
