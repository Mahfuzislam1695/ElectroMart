import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedCategories } from "@/components/featured-categories"
import { SpecialOffers } from "@/components/special-offers"
import { FeaturedBrands } from "@/components/featured-brands"
import { TopRatedProducts } from "@/components/top-rated-products"
import { EMIHighlight } from "@/components/emi-highlight"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <FeaturedCategories />
        <SpecialOffers />
        <TopRatedProducts />
        <FeaturedBrands />
        <EMIHighlight />
      </main>
    </div>
  )
}
