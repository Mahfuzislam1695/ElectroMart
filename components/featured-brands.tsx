import { Card, CardContent } from "@/components/ui/card"

const brands = [
  { name: "Samsung", logo: "/samsung-logo.png" },
  { name: "LG", logo: "/lg-logo.png" },
  { name: "Sony", logo: "/sony-logo.png" },
  { name: "Panasonic", logo: "/panasonic-logo.png" },
  { name: "Walton", logo: "/walton-logo.png" },
  { name: "Minister", logo: "/minister-logo.png" },
  { name: "Sharp", logo: "/sharp-logo.png" },
  { name: "Hitachi", logo: "/hitachi-logo.png" },
]

export function FeaturedBrands() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Brands</h2>
          <p className="text-lg text-muted-foreground">Shop from trusted electronics brands in Bangladesh</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {brands.map((brand) => (
            <Card
              key={brand.name}
              className="glass-card hover:shadow-md transition-all duration-300 cursor-pointer group hover:scale-105"
            >
              <CardContent className="p-4 flex items-center justify-center">
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  className="h-8 w-auto object-contain grayscale group-hover:grayscale-0 transition-all"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
