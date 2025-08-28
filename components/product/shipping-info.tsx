import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Shield, RotateCcw, MapPin, Clock, Wrench } from "lucide-react"

interface ShippingInfoProps {
  shipping: {
    freeDelivery: boolean
    deliveryTime: string
    installation: boolean
    installationCharge: number
  }
  warranty: {
    comprehensive: string
    compressor: string
    parts: string
  }
}

export default function ShippingInfo({ shipping, warranty }: ShippingInfoProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Shipping Information */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" />
            Shipping & Delivery
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Free Delivery</span>
            </div>
            {shipping.freeDelivery && <Badge className="bg-green-500 text-white">Free</Badge>}
          </div>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Delivery Time: {shipping.deliveryTime}</span>
          </div>

          {shipping.installation && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-orange-600" />
                <span>Professional Installation</span>
              </div>
              <span className="font-medium">৳{shipping.installationCharge}</span>
            </div>
          )}

          <div className="bg-blue-50 p-3 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Delivery Areas in Bangladesh</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Dhaka: Same day delivery available</li>
              <li>• Chittagong, Sylhet: 1-2 business days</li>
              <li>• Other major cities: 2-4 business days</li>
              <li>• Remote areas: 3-7 business days</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Returns & Warranty */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Returns & Warranty
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <RotateCcw className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium">7-Day Return Policy</p>
              <p className="text-sm text-gray-600">Easy returns within 7 days</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Warranty Coverage</h4>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Comprehensive Warranty</span>
                <Badge variant="outline">{warranty.comprehensive}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Compressor Warranty</span>
                <Badge variant="outline">{warranty.compressor}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Parts Warranty</span>
                <Badge variant="outline">{warranty.parts}</Badge>
              </div>
            </div>
          </div>

          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">What's Covered</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Manufacturing defects</li>
              <li>• Electrical component failures</li>
              <li>• Free service calls during warranty</li>
              <li>• Genuine spare parts replacement</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
