// "use client"

// import { useCart } from "@/contexts/cart-context"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Separator } from "@/components/ui/separator"
// import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
// import Image from "next/image"
// import Link from "next/link"
// import { useState } from "react"

// // Mock recommended products
// const recommendedProducts = [
//   {
//     id: "acc-1",
//     name: "AC Remote Control",
//     price: 1500,
//     image: "/ac-remote-control.png",
//     category: "Accessories",
//   },
//   {
//     id: "acc-2",
//     name: "Voltage Stabilizer",
//     price: 3500,
//     image: "/voltage-stabilizer.png",
//     category: "Accessories",
//   },
//   {
//     id: "acc-3",
//     name: "AC Cover",
//     price: 800,
//     image: "/ac-protective-cover.png",
//     category: "Accessories",
//   },
// ]

// export default function CartPage() {
//   const { state, updateQuantity, removeItem, addItem } = useCart()
//   const [promoCode, setPromoCode] = useState("")
//   const [discount, setDiscount] = useState(0)
//   const [shippingCost, setShippingCost] = useState(0)

//   const handleQuantityChange = (id: string, newQuantity: number) => {
//     if (newQuantity < 1) {
//       removeItem(id)
//     } else {
//       updateQuantity(id, newQuantity)
//     }
//   }

//   const handlePromoCode = () => {
//     // Mock promo code logic
//     if (promoCode.toLowerCase() === "save10") {
//       setDiscount(state.total * 0.1)
//     } else if (promoCode.toLowerCase() === "welcome20") {
//       setDiscount(state.total * 0.2)
//     } else {
//       setDiscount(0)
//     }
//   }

//   const calculateShipping = () => {
//     // Mock shipping calculation
//     if (state.total > 50000) {
//       setShippingCost(0) // Free shipping over 50k
//     } else {
//       setShippingCost(500) // Standard shipping
//     }
//   }

//   const finalTotal = state.total - discount + shippingCost

//   if (state.items.length === 0) {
//     return (
//       <div className="min-h-screen bg-background">
//         <div className="container mx-auto px-4 py-16">
//           <div className="text-center max-w-md mx-auto">
//             <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
//             <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
//             <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
//             <Link href="/">
//               <Button size="lg" className="w-full">
//                 Continue Shopping
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-background">

//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
//           <Link href="/" className="hover:text-foreground">
//             Home
//           </Link>
//           <span>/</span>
//           <span className="text-foreground">Shopping Cart</span>
//         </nav>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="flex items-center justify-between">
//               <h1 className="text-2xl font-bold">Shopping Cart</h1>
//               <span className="text-muted-foreground">
//                 {state.itemCount} {state.itemCount === 1 ? "item" : "items"}
//               </span>
//             </div>

//             <div className="space-y-4">
//               {state.items.map((item) => (
//                 <Card key={item.id} className="glass-card">
//                   <CardContent className="p-6">
//                     <div className="flex gap-4">
//                       <div className="relative h-24 w-24 flex-shrink-0">
//                         <Image
//                           src={item.image || "/placeholder.svg"}
//                           alt={item.name}
//                           fill
//                           className="object-cover rounded-lg"
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h3 className="font-semibold text-lg">{item.name}</h3>
//                             <Badge variant="secondary" className="mt-1">
//                               {item.category}
//                             </Badge>
//                           </div>
//                           <Button
//                             variant="ghost"
//                             size="icon"
//                             onClick={() => removeItem(item.id)}
//                             className="text-destructive hover:text-destructive"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         </div>

//                         <div className="space-y-2 mb-4">
//                           {item.specs.slice(0, 2).map((spec, index) => (
//                             <p key={index} className="text-sm text-muted-foreground">
//                               • {spec}
//                             </p>
//                           ))}
//                         </div>

//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
//                               className="h-8 w-8"
//                             >
//                               <Minus className="h-3 w-3" />
//                             </Button>
//                             <span className="font-medium w-8 text-center">{item.quantity}</span>
//                             <Button
//                               variant="outline"
//                               size="icon"
//                               onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
//                               className="h-8 w-8"
//                             >
//                               <Plus className="h-3 w-3" />
//                             </Button>
//                           </div>

//                           <div className="text-right">
//                             <p className="text-lg font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
//                             {item.originalPrice && (
//                               <p className="text-sm text-muted-foreground line-through">
//                                 ৳{(item.originalPrice * item.quantity).toLocaleString()}
//                               </p>
//                             )}
//                           </div>
//                         </div>

//                         {!item.inStock && (
//                           <Badge variant="destructive" className="mt-2">
//                             Out of Stock
//                           </Badge>
//                         )}
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>

//             {/* Recommended Add-ons */}
//             <Card className="glass-card">
//               <CardHeader>
//                 <CardTitle className="text-lg">Recommended Add-ons</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {recommendedProducts.map((product) => (
//                     <div key={product.id} className="flex items-center space-x-3 p-3 rounded-lg border">
//                       <Image
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.name}
//                         width={60}
//                         height={60}
//                         className="rounded-lg"
//                       />
//                       <div className="flex-1 min-w-0">
//                         <h4 className="font-medium text-sm">{product.name}</h4>
//                         <p className="text-sm font-bold text-primary">৳{product.price.toLocaleString()}</p>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           className="mt-2 w-full bg-transparent"
//                           onClick={() =>
//                             addItem({
//                               id: product.id,
//                               name: product.name,
//                               price: product.price,
//                               image: product.image,
//                               category: product.category,
//                               specs: ["Compatible accessory"],
//                               inStock: true,
//                             })
//                           }
//                         >
//                           Add to Cart
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Order Summary */}
//           <div className="space-y-6">
//             <Card className="glass-card sticky top-24">
//               <CardHeader>
//                 <CardTitle>Order Summary</CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({state.itemCount} items)</span>
//                   <span>৳{state.total.toLocaleString()}</span>
//                 </div>

//                 {discount > 0 && (
//                   <div className="flex justify-between text-green-600">
//                     <span>Discount</span>
//                     <span>-৳{discount.toLocaleString()}</span>
//                   </div>
//                 )}

//                 <div className="flex justify-between">
//                   <span>Shipping</span>
//                   <span>{shippingCost === 0 ? "Free" : `৳${shippingCost.toLocaleString()}`}</span>
//                 </div>

//                 <Separator />

//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total</span>
//                   <span>৳{finalTotal.toLocaleString()}</span>
//                 </div>

//                 {/* Promo Code */}
//                 <div className="space-y-2">
//                   <div className="flex space-x-2">
//                     <Input
//                       placeholder="Enter promo code"
//                       value={promoCode}
//                       onChange={(e) => setPromoCode(e.target.value)}
//                     />
//                     <Button variant="outline" onClick={handlePromoCode}>
//                       Apply
//                     </Button>
//                   </div>
//                   <p className="text-xs text-muted-foreground">Try: SAVE10 or WELCOME20</p>
//                 </div>

//                 {/* Shipping Calculator */}
//                 <Button variant="outline" className="w-full bg-transparent" onClick={calculateShipping}>
//                   <Truck className="h-4 w-4 mr-2" />
//                   Calculate Shipping
//                 </Button>

//                 {/* Action Buttons */}
//                 <div className="space-y-3">
//                   <Link href="/checkout">
//                     <Button size="lg" className="w-full">
//                       Proceed to Checkout
//                     </Button>
//                   </Link>
//                   <Link href="/">
//                     <Button variant="outline" size="lg" className="w-full bg-transparent">
//                       <ArrowLeft className="h-4 w-4 mr-2" />
//                       Continue Shopping
//                     </Button>
//                   </Link>
//                 </div>

//                 {/* Trust Badges */}
//                 <div className="pt-4 space-y-2">
//                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                     <Shield className="h-4 w-4" />
//                     <span>Secure checkout</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                     <Truck className="h-4 w-4" />
//                     <span>Free shipping over ৳50,000</span>
//                   </div>
//                   <div className="flex items-center space-x-2 text-sm text-muted-foreground">
//                     <RotateCcw className="h-4 w-4" />
//                     <span>7-day return policy</span>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

// Mock recommended products
const recommendedProducts = [
  {
    id: "acc-1",
    name: "AC Remote Control",
    price: 1500,
    image: "/ac-remote-control.png",
    category: "Accessories",
  },
  {
    id: "acc-2",
    name: "Voltage Stabilizer",
    price: 3500,
    image: "/voltage-stabilizer.png",
    category: "Accessories",
  },
  {
    id: "acc-3",
    name: "AC Cover",
    price: 800,
    image: "/ac-protective-cover.png",
    category: "Accessories",
  },
]

// Demo cart items
const demoCartItems = [
  {
    id: "ac-1",
    name: "Inverter AC 1.5 Ton",
    price: 85000,
    originalPrice: 92000,
    image: "/lg-air-conditioner-white-modern.png",
    category: "Air Conditioners",
    specs: ["1.5 Ton Capacity", "Inverter Technology", "5-Star Rating"],
    inStock: true,
    quantity: 1
  },
  {
    id: "ac-2",
    name: "Split AC 2 Ton",
    price: 65000,
    image: "/samsung-ac-white-modern.png",
    category: "Air Conditioners",
    specs: ["2 Ton Capacity", "Fast Cooling", "Auto Clean"],
    inStock: true,
    quantity: 2
  }
]

export default function CartPage() {
  const { state, updateQuantity, removeItem, addItem, initializeCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [hasInitializedDemo, setHasInitializedDemo] = useState(false)

  // Initialize with demo data if cart is empty
  useEffect(() => {
    if (state.items.length === 0 && !hasInitializedDemo) {
      // This assumes your cart context has an initializeCart function
      // If not, you might need to add items individually
      demoCartItems.forEach(item => {
        addItem(item);
      });
      setHasInitializedDemo(true);
    }
  }, [state.items.length, hasInitializedDemo, addItem]);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handlePromoCode = () => {
    // Mock promo code logic
    if (promoCode.toLowerCase() === "save10") {
      setDiscount(state.total * 0.1)
    } else if (promoCode.toLowerCase() === "welcome20") {
      setDiscount(state.total * 0.2)
    } else {
      setDiscount(0)
    }
  }

  const calculateShipping = () => {
    // Mock shipping calculation
    if (state.total > 50000) {
      setShippingCost(0) // Free shipping over 50k
    } else {
      setShippingCost(500) // Standard shipping
    }
  }

  const finalTotal = state.total - discount + shippingCost

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button size="lg" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Shopping Cart</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Shopping Cart</h1>
              <span className="text-muted-foreground">
                {state.itemCount} {state.itemCount === 1 ? "item" : "items"}
              </span>
            </div>

            <div className="space-y-4">
              {state.items.map((item) => (
                <Card key={item.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <Badge variant="secondary" className="mt-1">
                              {item.category}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2 mb-4">
                          {item.specs.slice(0, 2).map((spec, index) => (
                            <p key={index} className="text-sm text-muted-foreground">
                              • {spec}
                            </p>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                            {item.originalPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                ৳{(item.originalPrice * item.quantity).toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>

                        {!item.inStock && (
                          <Badge variant="destructive" className="mt-2">
                            Out of Stock
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recommended Add-ons */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Recommended Add-ons</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{product.name}</h4>
                        <p className="text-sm font-bold text-primary">৳{product.price.toLocaleString()}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 w-full bg-transparent"
                          onClick={() =>
                            addItem({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image,
                              category: product.category,
                              specs: ["Compatible accessory"],
                              inStock: true,
                            })
                          }
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({state.itemCount} items)</span>
                  <span>৳{state.total.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? "Free" : `৳${shippingCost.toLocaleString()}`}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>৳{finalTotal.toLocaleString()}</span>
                </div>

                {/* Promo Code */}
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={handlePromoCode}>
                      Apply
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Try: SAVE10 or WELCOME20</p>
                </div>

                {/* Shipping Calculator */}
                <Button variant="outline" className="w-full bg-transparent" onClick={calculateShipping}>
                  <Truck className="h-4 w-4 mr-2" />
                  Calculate Shipping
                </Button>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link href="/checkout">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" size="lg" className="w-full bg-transparent">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-4 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping over ৳50,000</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <RotateCcw className="h-4 w-4" />
                    <span>7-day return policy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}