"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Upload, Download, CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const sampleData = [
  {
    row: 1,
    name: "Samsung AC 1.5 Ton",
    sku: "SAM-AC-001",
    price: "50000",
    stock: "25",
    status: "valid",
    errors: [],
  },
  {
    row: 2,
    name: "LG Refrigerator",
    sku: "",
    price: "invalid_price",
    stock: "10",
    status: "error",
    errors: ["SKU is required", "Invalid price format"],
  },
  {
    row: 3,
    name: "Sony TV 55 inch",
    sku: "SONY-TV-001",
    price: "85000",
    stock: "-5",
    status: "warning",
    errors: ["Stock cannot be negative"],
  },
]

export function BulkImport() {
  const [step, setStep] = useState(1)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [validationResults, setValidationResults] = useState(sampleData)

  const handleFileUpload = () => {
    setStep(2)
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setStep(3)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-100 text-green-800">Valid</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      case "warning":
        return <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {step === 1 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload File</CardTitle>
              <CardDescription>Upload your product data in Excel (.xlsx) or CSV format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Button onClick={handleFileUpload} className="mb-2">
                    Choose File
                  </Button>
                  <p className="text-sm text-gray-500">Supported formats: .xlsx, .csv (Max size: 10MB)</p>
                </div>
              </div>

              <Alert>
                <Download className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <span>Download our template to ensure proper formatting</span>
                    <Button variant="outline" size="sm">
                      Download Template
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Required Fields</CardTitle>
              <CardDescription>Make sure your file includes these columns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Required Fields:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Product Name</li>
                    <li>• SKU</li>
                    <li>• Category</li>
                    <li>• Brand</li>
                    <li>• Price</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Optional Fields:</h4>
                  <ul className="text-sm space-y-1 text-gray-600">
                    <li>• Description</li>
                    <li>• Stock Quantity</li>
                    <li>• Sale Price</li>
                    <li>• Weight</li>
                    <li>• Dimensions</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Uploading File</CardTitle>
            <CardDescription>Please wait while we process your file</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={uploadProgress} className="w-full" />
            <p className="text-sm text-gray-600 text-center">Processing... {uploadProgress}%</p>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Validation Results</CardTitle>
              <CardDescription>Review the validation results before importing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">1</div>
                  <div className="text-sm text-gray-600">Valid Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">1</div>
                  <div className="text-sm text-gray-600">Warnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Row</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Issues</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationResults.map((item) => (
                    <TableRow key={item.row}>
                      <TableCell>{item.row}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.sku || "-"}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.stock}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(item.status)}
                          {getStatusBadge(item.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.errors.length > 0 && (
                          <div className="space-y-1">
                            {item.errors.map((error, index) => (
                              <div key={index} className="text-xs text-red-600">
                                {error}
                              </div>
                            ))}
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setStep(1)}>
              Upload New File
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">Import Valid Records (1)</Button>
          </div>
        </div>
      )}
    </div>
  )
}
