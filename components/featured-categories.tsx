import { Card, CardContent } from "@/components/ui/card"
import { Snowflake, Tv, Waves, Microwave, Smartphone, Laptop } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    name: "Air Conditioners",
    slug: "air-conditioners", // Added slug mapping for proper routing
    icon: Snowflake,
    count: "150+ Models",
    color: "text-blue-500",
  },
  {
    name: "Refrigerators",
    slug: "refrigerators",
    icon: Snowflake,
    count: "200+ Models",
    color: "text-cyan-500",
  },
  {
    name: "Smart TVs",
    slug: "smart-tvs",
    icon: Tv,
    count: "300+ Models",
    color: "text-purple-500",
  },
  {
    name: "Washing Machines",
    slug: "washing-machines",
    icon: Waves,
    count: "120+ Models",
    color: "text-teal-500",
  },
  {
    name: "Microwave Ovens",
    slug: "microwave-ovens",
    icon: Microwave,
    count: "80+ Models",
    color: "text-orange-500",
  },
  {
    name: "Mobile Phones",
    slug: "mobile-phones",
    icon: Smartphone,
    count: "500+ Models",
    color: "text-green-500",
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: Laptop,
    count: "250+ Models",
    color: "text-indigo-500",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground">Explore our wide range of electronics</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/category/${category.slug}`}>
              <Card className="glass-card hover:shadow-lg transition-all duration-300 cursor-pointer group hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <category.icon
                      className={`h-12 w-12 mx-auto ${category.color} group-hover:scale-110 transition-transform`}
                    />
                  </div>
                  <h3 className="font-semibold mb-2 text-sm md:text-base">{category.name}</h3>
                  <p className="text-xs text-muted-foreground">{category.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
