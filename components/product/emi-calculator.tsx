"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, CreditCard } from "lucide-react"

interface EMICalculatorProps {
  price: number
  emiOptions: { tenure: number; amount: number }[]
}

export default function EMICalculator({ price, emiOptions }: EMICalculatorProps) {
  const [selectedTenure, setSelectedTenure] = useState<number>(12)
  const [showEligibility, setShowEligibility] = useState(false)

  const selectedEMI = emiOptions.find((option) => option.tenure === selectedTenure)

  return (
    <Card className="glass-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="w-5 h-5 text-blue-600" />
          EMI Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Tenure</label>
            <Select value={selectedTenure.toString()} onValueChange={(value) => setSelectedTenure(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {emiOptions.map((option) => (
                  <SelectItem key={option.tenure} value={option.tenure.toString()}>
                    {option.tenure} months
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Monthly EMI</label>
            <div className="mt-1 p-3 bg-blue-50 rounded-lg">
              <span className="text-lg font-bold text-blue-600">৳{selectedEMI?.amount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span>Product Price:</span>
            <span>৳{price.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Processing Fee:</span>
            <span>৳0</span>
          </div>
          <div className="flex justify-between text-sm font-medium border-t pt-2">
            <span>Total Amount:</span>
            <span>৳{selectedEMI ? (selectedEMI.amount * selectedTenure).toLocaleString() : "0"}</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => setShowEligibility(!showEligibility)}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Check EMI Eligibility
        </Button>

        {showEligibility && (
          <div className="bg-green-50 p-3 rounded-lg">
            <p className="text-sm text-green-700 font-medium mb-2">EMI Available on:</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• All major credit cards</li>
              <li>• Debit cards from select banks</li>
              <li>• No cost EMI on HDFC, ICICI, SBI cards</li>
              <li>• Processing fee may apply for some banks</li>
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
