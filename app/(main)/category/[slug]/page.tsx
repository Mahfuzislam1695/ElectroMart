import { Suspense } from "react"
import { notFound } from "next/navigation"
import CategoryHeader from "@/components/category/category-header"
import CategoryFilters from "@/components/category/category-filters"
import ProductGrid from "@/components/category/product-grid"
import CategoryBreadcrumb from "@/components/category/category-breadcrumb"

// Category data with specifications
const categories = {
  "air-conditioners": {
    name: "Air Conditioners",
    description: "Stay cool with our range of energy-efficient air conditioners",
    totalProducts: 150,
    filters: {
      tonnage: ["1 Ton", "1.5 Ton", "2 Ton", "2.5 Ton"],
      type: ["Inverter", "Non-Inverter"],
      energyRating: ["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"],
      brands: ["LG", "Samsung", "Daikin", "Carrier", "Voltas", "Hitachi"],
    },
  },
  refrigerators: {
    name: "Refrigerators",
    description: "Keep your food fresh with our premium refrigerators",
    totalProducts: 200,
    filters: {
      capacity: ["150-200L", "200-300L", "300-400L", "400L+"],
      type: ["Single Door", "Double Door", "Side by Side", "French Door"],
      features: ["Frost Free", "Direct Cool", "Convertible", "Smart Connect"],
      brands: ["LG", "Samsung", "Whirlpool", "Godrej", "Haier", "Bosch"],
    },
  },
  "smart-tvs": {
    name: "Smart TVs",
    description: "Experience entertainment like never before",
    totalProducts: 300,
    filters: {
      screenSize: ['32"', '43"', '50"', '55"', '65"', '75"'],
      resolution: ["HD", "Full HD", "4K", "8K"],
      smartFeatures: ["Android TV", "WebOS", "Tizen", "Fire TV"],
      brands: ["Samsung", "LG", "Sony", "TCL", "Mi", "OnePlus"],
    },
  },
  "washing-machines": {
    name: "Washing Machines",
    description: "Efficient washing solutions for your home",
    totalProducts: 120,
    filters: {
      capacity: ["6kg", "7kg", "8kg", "9kg", "10kg+"],
      type: ["Top Load", "Front Load", "Semi Automatic"],
      features: ["Inverter", "Steam Wash", "Quick Wash", "Smart Connect"],
      brands: ["LG", "Samsung", "Whirlpool", "IFB", "Bosch", "Godrej"],
    },
  },
  "microwave-ovens": {
    name: "Microwave Ovens",
    description: "Cook, reheat, and grill with convenience",
    totalProducts: 80,
    filters: {
      capacity: ["20L", "25L", "30L", "35L+"],
      type: ["Solo", "Grill", "Convection"],
      features: ["Auto Cook", "Child Lock", "Express Cook", "Defrost"],
      brands: ["LG", "Samsung", "IFB", "Godrej", "Bajaj", "Panasonic"],
    },
  },
  "mobile-phones": {
    name: "Mobile Phones",
    description: "Latest smartphones with cutting-edge technology",
    totalProducts: 500,
    filters: {
      storage: ["64GB", "128GB", "256GB", "512GB", "1TB"],
      ram: ["4GB", "6GB", "8GB", "12GB", "16GB+"],
      camera: ["Single", "Dual", "Triple", "Quad"],
      brands: ["Samsung", "Apple", "OnePlus", "Xiaomi", "Oppo", "Vivo"],
    },
  },
  laptops: {
    name: "Laptops",
    description: "Powerful laptops for work and entertainment",
    totalProducts: 250,
    filters: {
      processor: ["Intel i3", "Intel i5", "Intel i7", "AMD Ryzen 5", "AMD Ryzen 7"],
      ram: ["4GB", "8GB", "16GB", "32GB"],
      storage: ["256GB SSD", "512GB SSD", "1TB SSD", "1TB HDD"],
      brands: ["HP", "Dell", "Lenovo", "Asus", "Acer", "Apple"],
    },
  },
}

interface CategoryPageProps {
  params: {
    slug: string
  }
  searchParams: {
    sort?: string
    view?: "grid" | "list"
    page?: string
    [key: string]: string | undefined
  }
}

export default function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const category = categories[params.slug as keyof typeof categories]

  if (!category) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <CategoryBreadcrumb categoryName={category.name} />

      <div className="container mx-auto px-4 py-6">
        <CategoryHeader
          name={category.name}
          description={category.description}
          totalProducts={category.totalProducts}
        />

        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          <aside className="lg:w-80 flex-shrink-0">
            <CategoryFilters categorySlug={params.slug} filters={category.filters} searchParams={searchParams} />
          </aside>

          <main className="flex-1">
            <Suspense fallback={<div className="animate-pulse">Loading products...</div>}>
              <ProductGrid categorySlug={params.slug} searchParams={searchParams} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({
    slug,
  }))
}
