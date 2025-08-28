import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const footerLinks = {
  Shop: [
    { name: "Air Conditioners", href: "/category/air-conditioners" },
    { name: "Refrigerators", href: "/category/refrigerators" },
    { name: "Smart TVs", href: "/category/smart-tvs" },
    { name: "Washing Machines", href: "/category/washing-machines" },
    { name: "Mobile Phones", href: "/category/mobile-phones" },
    { name: "All Categories", href: "/categories" },
  ],
  Support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Warranty", href: "/warranty" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "EMI Information", href: "/emi-info" },
    { name: "Track Order", href: "/order-tracking" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Blog", href: "/blog" },
    { name: "Affiliate Program", href: "/affiliate" },
    { name: "Terms of Service", href: "/terms" },
  ],
  Account: [
    { name: "My Account", href: "/my-account" },
    { name: "Order History", href: "/my-account" },
    { name: "Wishlist", href: "/wishlist" },
    { name: "Compare Products", href: "/compare" },
    { name: "Shopping Cart", href: "/cart" },
    { name: "Privacy Policy", href: "/privacy" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <h3 className="text-xl font-bold text-primary mb-4">ElectroMart</h3>
            </Link>
            <p className="text-muted-foreground mb-4">
              Your trusted electronics partner in Bangladesh. Quality products, competitive prices, and excellent
              service since 2020.
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@electromart.bd</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Gulshan, Dhaka 1212, Bangladesh</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="icon" variant="ghost" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="ghost" asChild>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold mb-2">Stay Updated</h4>
              <p className="text-sm text-muted-foreground">Get the latest deals and offers delivered to your inbox</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Input placeholder="Enter your email" className="md:w-64" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Links & Copyright */}
        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="/return-policy" className="text-muted-foreground hover:text-primary transition-colors">
                Return Policy
              </Link>
              <Link href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">
                Shipping Info
              </Link>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>🔒 Secure Shopping</span>
              <span>🚚 Fast Delivery</span>
              <span>💯 Authentic Products</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 ElectroMart Bangladesh. All rights reserved. | Powered by Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
