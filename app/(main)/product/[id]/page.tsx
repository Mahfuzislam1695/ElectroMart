import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import ProductImageGallery from "@/components/product/product-image-gallery"
import ProductInfo from "@/components/product/product-info"
import ProductSpecifications from "@/components/product/product-specifications"
import ProductReviews from "@/components/product/product-reviews"
import ProductRecommendations from "@/components/product/product-recommendations"
import ProductBreadcrumb from "@/components/product/product-breadcrumb"
import ShippingInfo from "@/components/product/shipping-info"
import AIChatbot from "@/components/product/ai-chatbot"

// Mock product data - in real app, fetch from database
const mockProducts = {
  "1": {
    id: "1",
    name: "LG 1.5 Ton 5 Star Inverter Split AC",
    model: "LS-Q18YNZA",
    brand: "LG",
    brandLogo: "/lg-logo.png",
    images: [
      "/lg-air-conditioner-white-modern.png",
      "/lg-ac-indoor-unit.png",
      "/lg-ac-outdoor-unit.png",
      "/lg-ac-remote.png",
    ],
    price: 45000,
    originalPrice: 52000,
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    stockCount: 15,
    category: "Air Conditioners",
    categorySlug: "air-conditioners",
    specifications: {
      "Cooling Capacity": "1.5 Ton (5275 W)",
      "Energy Rating": "5 Star",
      "Compressor Type": "Dual Inverter",
      Refrigerant: "R32",
      Condenser: "Copper",
      "Room Size": "Up to 180 sq ft",
      "Power Consumption": "1560 W",
      Warranty: "10 years on compressor, 1 year comprehensive",
    },
    features: [
      "Energy Efficient 5 Star Rating",
      "Copper Condenser for Better Cooling",
      "Dual Inverter Compressor",
      "Smart Diagnosis",
      "4-Way Swing",
      "Auto Clean Function",
      "Low Gas Detection",
      "Ocean Black Protection",
    ],
    description:
      "Experience superior cooling with LG's advanced Dual Inverter technology. This 1.5 ton split AC delivers exceptional energy efficiency with 5-star rating while ensuring optimal comfort for medium-sized rooms.",
    emiAvailable: true,
    emiOptions: [
      { tenure: 3, amount: 15667 },
      { tenure: 6, amount: 7917 },
      { tenure: 9, amount: 5361 },
      { tenure: 12, amount: 4083 },
    ],
    warranty: {
      comprehensive: "1 Year",
      compressor: "10 Years",
      parts: "5 Years",
    },
    shipping: {
      freeDelivery: true,
      deliveryTime: "2-4 business days",
      installation: true,
      installationCharge: 2500,
    },
  },
  "2": {
    id: "2",
    name: "Samsung 253L Double Door Refrigerator",
    model: "RT28T3922S8/HL",
    brand: "Samsung",
    brandLogo: "/samsung-logo.png",
    images: [
      "/samsung-refrigerator-silver-modern.png",
      "/samsung-fridge-interior.png",
      "/samsung-fridge-freezer.png",
      "/samsung-fridge-door.png",
    ],
    price: 32000,
    originalPrice: 38000,
    rating: 4.3,
    reviewCount: 156,
    inStock: true,
    stockCount: 8,
    category: "Refrigerators",
    categorySlug: "refrigerators",
    specifications: {
      Capacity: "253 Liters",
      Type: "Double Door",
      Defrosting: "Frost Free",
      Compressor: "Digital Inverter",
      "Energy Rating": "3 Star",
      Shelves: "Toughened Glass",
      "Vegetable Box": "Moisture Fresh Crisper",
      Warranty: "10 years on compressor, 1 year comprehensive",
    },
    features: [
      "Digital Inverter Technology",
      "Frost Free Operation",
      "Toughened Glass Shelves",
      "Moisture Fresh Crisper",
      "Stabilizer Free Operation",
      "Door Alarm",
      "LED Lighting",
      "Antibacterial Gasket",
    ],
    description:
      "Keep your food fresh longer with Samsung's advanced Digital Inverter technology. This spacious 253L double door refrigerator offers excellent storage solutions with energy-efficient operation.",
    emiAvailable: true,
    emiOptions: [
      { tenure: 3, amount: 11167 },
      { tenure: 6, amount: 5667 },
      { tenure: 9, amount: 3833 },
      { tenure: 12, amount: 2917 },
    ],
    warranty: {
      comprehensive: "1 Year",
      compressor: "10 Years",
      parts: "2 Years",
    },
    shipping: {
      freeDelivery: true,
      deliveryTime: "3-5 business days",
      installation: true,
      installationCharge: 1500,
    },
  },
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts[params.id as keyof typeof mockProducts]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">

      <ProductBreadcrumb category={product.category} categorySlug={product.categorySlug} productName={product.name} />

      <div className="container mx-auto px-4 py-6">
        {/* Main Product Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <ProductImageGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        {/* Specifications */}
        <ProductSpecifications
          specifications={product.specifications}
          features={product.features}
          description={product.description}
        />

        {/* Reviews */}
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>}>
          <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
        </Suspense>

        {/* Recommendations */}
        <ProductRecommendations currentProductId={product.id} category={product.categorySlug} />

        {/* Shipping Info */}
        <ShippingInfo shipping={product.shipping} warranty={product.warranty} />
      </div>

      {/* AI Chatbot */}
      <AIChatbot productName={product.name} />
    </div>
  )
}

export function generateStaticParams() {
  return Object.keys(mockProducts).map((id) => ({
    id,
  }))
}
