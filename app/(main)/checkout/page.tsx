"use client"

import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Smartphone,
  Building2,
  Shield,
  CheckCircle,
  Download,
  Package,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

type CheckoutStep = "customer" | "shipping" | "payment" | "review" | "confirmation"

interface CustomerInfo {
  email: string
  firstName: string
  lastName: string
  phone: string
  createAccount: boolean
}

interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  district: string
  postalCode: string
  phone: string
  saveAddress: boolean
}

interface PaymentMethod {
  type: "card" | "mobile" | "bank" | "emi"
  provider?: string
  emiPlan?: string
}

const steps = [
  { id: "customer", title: "Customer Info", progress: 25 },
  { id: "shipping", title: "Shipping", progress: 50 },
  { id: "payment", title: "Payment", progress: 75 },
  { id: "review", title: "Review", progress: 100 },
]

const bangladeshiDistricts = ["Dhaka", "Chittagong", "Rajshahi", "Khulna", "Barisal", "Sylhet", "Rangpur", "Mymensingh"]

const emiPlans = [
  { months: 3, rate: 0, description: "3 months - 0% interest" },
  { months: 6, rate: 5, description: "6 months - 5% interest" },
  { months: 12, rate: 8, description: "12 months - 8% interest" },
  { months: 24, rate: 12, description: "24 months - 12% interest" },
]

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("customer")
  const [isGuest, setIsGuest] = useState(true)
  const [orderNumber, setOrderNumber] = useState("")

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    createAccount: false,
  })

  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    postalCode: "",
    phone: "",
    saveAddress: false,
  })

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: "card",
  })

  const currentStepIndex = steps.findIndex((step) => step.id === currentStep)
  const currentProgress = steps[currentStepIndex]?.progress || 0

  const handleNext = () => {
    const stepOrder: CheckoutStep[] = ["customer", "shipping", "payment", "review"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1])
    }
  }

  const handleBack = () => {
    const stepOrder: CheckoutStep[] = ["customer", "shipping", "payment", "review"]
    const currentIndex = stepOrder.indexOf(currentStep)
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1])
    }
  }

  const handlePlaceOrder = () => {
    // Generate mock order number
    const orderNum = "EM" + Date.now().toString().slice(-6)
    setOrderNumber(orderNum)
    setCurrentStep("confirmation")
    clearCart()
  }

  const calculateEMI = (amount: number, months: number, rate: number) => {
    const monthlyRate = rate / 100 / 12
    const emi =
      monthlyRate > 0
        ? (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
        : amount / months
    return Math.round(emi)
  }

  if (state.items.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <Package className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items to your cart before proceeding to checkout.</p>
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
        {currentStep !== "confirmation" && (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStepIndex >= index
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                        }`}
                    >
                      {currentStepIndex > index ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <span
                      className={`ml-2 text-sm ${currentStepIndex >= index ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${currentStepIndex > index ? "bg-primary" : "bg-muted"}`} />
                    )}
                  </div>
                ))}
              </div>
              <Progress value={currentProgress} className="h-2" />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Step 1: Customer Information */}
                {currentStep === "customer" && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Customer Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Guest/Login Toggle */}
                      <RadioGroup
                        value={isGuest ? "guest" : "login"}
                        onValueChange={(value) => setIsGuest(value === "guest")}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="guest" id="guest" />
                          <Label htmlFor="guest">Checkout as guest</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="login" id="login" />
                          <Label htmlFor="login">I have an account</Label>
                        </div>
                      </RadioGroup>

                      {!isGuest && (
                        <div className="space-y-4 p-4 bg-muted rounded-lg">
                          <div className="space-y-2">
                            <Label htmlFor="login-email">Email</Label>
                            <Input id="login-email" type="email" placeholder="Enter your email" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="login-password">Password</Label>
                            <Input id="login-password" type="password" placeholder="Enter your password" />
                          </div>
                          <Button className="w-full">Sign In</Button>
                        </div>
                      )}

                      {isGuest && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name *</Label>
                              <Input
                                id="firstName"
                                value={customerInfo.firstName}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, firstName: e.target.value })}
                                placeholder="First name"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name *</Label>
                              <Input
                                id="lastName"
                                value={customerInfo.lastName}
                                onChange={(e) => setCustomerInfo({ ...customerInfo, lastName: e.target.value })}
                                placeholder="Last name"
                                required
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input
                              id="phone"
                              value={customerInfo.phone}
                              onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                              placeholder="+880 1XXX-XXXXXX"
                              required
                            />
                          </div>

                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="createAccount"
                              checked={customerInfo.createAccount}
                              onCheckedChange={(checked) =>
                                setCustomerInfo({ ...customerInfo, createAccount: checked as boolean })
                              }
                            />
                            <Label htmlFor="createAccount">Create an account for faster checkout next time</Label>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Step 2: Shipping Address */}
                {currentStep === "shipping" && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Shipping Address</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="shippingFirstName">First Name *</Label>
                          <Input
                            id="shippingFirstName"
                            value={shippingAddress.firstName}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                            placeholder="First name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingLastName">Last Name *</Label>
                          <Input
                            id="shippingLastName"
                            value={shippingAddress.lastName}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                            placeholder="Last name"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address *</Label>
                        <Input
                          id="address"
                          value={shippingAddress.address}
                          onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                          placeholder="House/Flat no, Road, Area"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingAddress.city}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                            placeholder="City/Upazila"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="district">District *</Label>
                          <select
                            id="district"
                            value={shippingAddress.district}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, district: e.target.value })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="">Select District</option>
                            {bangladeshiDistricts.map((district) => (
                              <option key={district} value={district}>
                                {district}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={shippingAddress.postalCode}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                            placeholder="1000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="shippingPhone">Phone Number *</Label>
                          <Input
                            id="shippingPhone"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            placeholder="+880 1XXX-XXXXXX"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="saveAddress"
                          checked={shippingAddress.saveAddress}
                          onCheckedChange={(checked) =>
                            setShippingAddress({ ...shippingAddress, saveAddress: checked as boolean })
                          }
                        />
                        <Label htmlFor="saveAddress">Save this address for future purchases</Label>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === "payment" && (
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <RadioGroup
                        value={paymentMethod.type}
                        onValueChange={(value) => setPaymentMethod({ ...paymentMethod, type: value as any })}
                      >
                        {/* Credit/Debit Cards */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card" className="flex items-center space-x-2">
                              <CreditCard className="h-4 w-4" />
                              <span>Credit/Debit Card</span>
                            </Label>
                          </div>
                          {paymentMethod.type === "card" && (
                            <div className="ml-6 space-y-4 p-4 bg-muted rounded-lg">
                              <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiry">Expiry Date</Label>
                                  <Input id="expiry" placeholder="MM/YY" />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input id="cvv" placeholder="123" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Mobile Banking */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="mobile" id="mobile" />
                            <Label htmlFor="mobile" className="flex items-center space-x-2">
                              <Smartphone className="h-4 w-4" />
                              <span>Mobile Banking</span>
                            </Label>
                          </div>
                          {paymentMethod.type === "mobile" && (
                            <div className="ml-6 space-y-4 p-4 bg-muted rounded-lg">
                              <RadioGroup
                                value={paymentMethod.provider}
                                onValueChange={(value) => setPaymentMethod({ ...paymentMethod, provider: value })}
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="bkash" id="bkash" />
                                  <Label htmlFor="bkash">bKash</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="nagad" id="nagad" />
                                  <Label htmlFor="nagad">Nagad</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="rocket" id="rocket" />
                                  <Label htmlFor="rocket">Rocket</Label>
                                </div>
                              </RadioGroup>
                            </div>
                          )}
                        </div>

                        {/* Bank Transfer */}
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bank" id="bank" />
                          <Label htmlFor="bank" className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4" />
                            <span>Bank Transfer</span>
                          </Label>
                        </div>

                        {/* EMI */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="emi" id="emi" />
                            <Label htmlFor="emi" className="flex items-center space-x-2">
                              <CreditCard className="h-4 w-4" />
                              <span>EMI (Easy Monthly Installments)</span>
                            </Label>
                          </div>
                          {paymentMethod.type === "emi" && (
                            <div className="ml-6 space-y-4 p-4 bg-muted rounded-lg">
                              <RadioGroup
                                value={paymentMethod.emiPlan}
                                onValueChange={(value) => setPaymentMethod({ ...paymentMethod, emiPlan: value })}
                              >
                                {emiPlans.map((plan) => {
                                  const monthlyAmount = calculateEMI(state.total, plan.months, plan.rate)
                                  return (
                                    <div
                                      key={plan.months}
                                      className="flex items-center justify-between p-3 border rounded-lg"
                                    >
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem value={plan.months.toString()} id={`emi-${plan.months}`} />
                                        <Label htmlFor={`emi-${plan.months}`} className="space-y-1">
                                          <div className="font-medium">{plan.description}</div>
                                          <div className="text-sm text-muted-foreground">
                                            ৳{monthlyAmount.toLocaleString()}/month
                                          </div>
                                        </Label>
                                      </div>
                                      <Badge variant="outline">
                                        Total: ৳{(monthlyAmount * plan.months).toLocaleString()}
                                      </Badge>
                                    </div>
                                  )
                                })}
                              </RadioGroup>
                            </div>
                          )}
                        </div>
                      </RadioGroup>

                      <div className="flex items-center space-x-2 p-4 bg-green-50 rounded-lg">
                        <Shield className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700">
                          Your payment information is secured with SSL encryption
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Step 4: Order Review */}
                {currentStep === "review" && (
                  <div className="space-y-6">
                    <Card className="glass-card">
                      <CardHeader>
                        <CardTitle>Order Review</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Customer Info */}
                        <div>
                          <h3 className="font-semibold mb-2">Customer Information</h3>
                          <p className="text-sm text-muted-foreground">
                            {customerInfo.firstName} {customerInfo.lastName}
                            <br />
                            {customerInfo.email}
                            <br />
                            {customerInfo.phone}
                          </p>
                        </div>

                        <Separator />

                        {/* Shipping Address */}
                        <div>
                          <h3 className="font-semibold mb-2">Shipping Address</h3>
                          <p className="text-sm text-muted-foreground">
                            {shippingAddress.firstName} {shippingAddress.lastName}
                            <br />
                            {shippingAddress.address}
                            <br />
                            {shippingAddress.city}, {shippingAddress.district} {shippingAddress.postalCode}
                            <br />
                            {shippingAddress.phone}
                          </p>
                        </div>

                        <Separator />

                        {/* Payment Method */}
                        <div>
                          <h3 className="font-semibold mb-2">Payment Method</h3>
                          <p className="text-sm text-muted-foreground">
                            {paymentMethod.type === "card" && "Credit/Debit Card"}
                            {paymentMethod.type === "mobile" && `Mobile Banking (${paymentMethod.provider})`}
                            {paymentMethod.type === "bank" && "Bank Transfer"}
                            {paymentMethod.type === "emi" && `EMI - ${paymentMethod.emiPlan} months`}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                      Place Order - ৳{state.total.toLocaleString()}
                    </Button>
                  </div>
                )}

                {/* Navigation Buttons */}
                {currentStep !== "review" && currentStep !== "confirmation" && (
                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={handleBack} disabled={currentStep === "customer"}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Order Summary Sidebar */}
              <div className="space-y-6">
                <Card className="glass-card sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      {state.items.map((item) => (
                        <div key={item.id} className="flex space-x-3">
                          <div className="relative h-16 w-16 flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-lg"
                            />
                            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                              {item.quantity}
                            </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                            <p className="text-sm font-bold">৳{(item.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{state.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>৳{state.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* Order Confirmation */}
        {currentStep === "confirmation" && (
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <CheckCircle className="h-24 w-24 mx-auto text-green-600" />
              <h1 className="text-3xl font-bold">Order Confirmed!</h1>
              <p className="text-lg text-muted-foreground">
                Thank you for your purchase. Your order has been successfully placed.
              </p>
            </div>

            <Card className="glass-card">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">Order Details</h2>
                  <p className="text-2xl font-bold text-primary">#{orderNumber}</p>
                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Order Date:</span>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Expected Delivery:</span>
                    <p className="font-medium">{new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Total Amount:</span>
                    <p className="font-medium">৳{state.total.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Payment Method:</span>
                    <p className="font-medium">
                      {paymentMethod.type === "card" && "Credit/Debit Card"}
                      {paymentMethod.type === "mobile" && "Mobile Banking"}
                      {paymentMethod.type === "bank" && "Bank Transfer"}
                      {paymentMethod.type === "emi" && "EMI"}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download Invoice
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Package className="h-4 w-4 mr-2" />
                    Track Your Order
                  </Button>
                  <Link href="/">
                    <Button variant="outline" className="w-full bg-transparent">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
