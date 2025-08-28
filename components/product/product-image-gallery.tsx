"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ZoomIn, RotateCcw } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const [rotation, setRotation] = useState(0)

  const handleZoom = () => {
    setIsZoomed(true)
  }

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-white rounded-2xl overflow-hidden group">
        <Image
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className="object-cover transition-transform duration-300"
          style={{ transform: `rotate(${rotation}deg)` }}
        />

        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 p-0 rounded-full bg-primary/90 hover:bg-white text-white hover:text-primary"
            onClick={handleZoom}
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-10 h-10 p-0 rounded-full bg-primary/90 hover:bg-white text-white hover:text-primary"
            onClick={handleRotate}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* 360° Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">360° View Available</div>
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? "border-blue-500 ring-2 ring-blue-200" : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${productName} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Zoom Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <div className="relative aspect-square">
            <Image
              src={images[selectedImage] || "/placeholder.svg"}
              alt={`${productName} - Zoomed`}
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
