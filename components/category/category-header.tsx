import { Package } from "lucide-react"

interface CategoryHeaderProps {
  name: string
  description: string
  totalProducts: number
}

export default function CategoryHeader({ name, description, totalProducts }: CategoryHeaderProps) {
  return (
    <div className="glass-card p-6 rounded-2xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {totalProducts}+ Products Available
        </span>
        <span>•</span>
        <span>Free Delivery Available</span>
        <span>•</span>
        <span>EMI Options Available</span>
      </div>
    </div>
  )
}
