import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "next-themes"
import { CartProvider } from "@/contexts/cart-context"
import { CompareProvider } from "@/contexts/compare-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { AIChatbot } from "@/components/ai-chatbot"

export const metadata: Metadata = {
  title: "ElectroMart - Your Electronics Shopping Destination",
  description:
    "Shop the latest electronics with AI-powered recommendations, EMI options, and fast delivery across Bangladesh",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="antialiased">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <CompareProvider>
            <WishlistProvider>
              <CartProvider>
                {children}
                <AIChatbot />
              </CartProvider>
            </WishlistProvider>
          </CompareProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
