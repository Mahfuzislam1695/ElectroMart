import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Samsung 1.5 Ton Inverter AC",
    price: "45,000",
    originalPrice: "55,000",
    rating: 4.8,
    reviews: 124,
    image: "/samsung-ac-unit.png",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "LG 260L Refrigerator",
    price: "38,000",
    originalPrice: "42,000",
    rating: 4.7,
    reviews: 89,
    image: "/modern-lg-refrigerator.png",
    badge: "Top Rated",
  },
  {
    id: 3,
    name: 'Sony 55" 4K Smart TV',
    price: "85,000",
    originalPrice: "95,000",
    rating: 4.9,
    reviews: 156,
    image: "/sony-4k-tv.png",
    badge: "Premium",
  },
  {
    id: 4,
    name: "Walton 7kg Washing Machine",
    price: "28,000",
    originalPrice: "32,000",
    rating: 4.6,
    reviews: 67,
    image: "/walton-washing-machine.png",
    badge: "Local Brand",
  },
]

export function TopRatedProducts() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Top-Rated Products</h2>
          <p className="text-lg text-muted-foreground">Customer favorites with excellent reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="glass-card hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge
                    className="absolute top-2 left-2"
                    variant={product.badge === "Best Seller" ? "destructive" : "secondary"}
                  >
                    {product.badge}
                  </Badge>
                  <Button size="icon" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold mb-2 text-sm line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-primary">৳{product.price}</span>
                    <span className="text-sm text-muted-foreground line-through">৳{product.originalPrice}</span>
                  </div>

                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
