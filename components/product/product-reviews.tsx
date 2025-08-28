"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, ThumbsUp, Filter } from "lucide-react"
import Image from "next/image"

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    userName: "Rahul Ahmed",
    rating: 5,
    date: "2024-01-15",
    verified: true,
    title: "Excellent cooling performance",
    review:
      "This AC has been amazing! The cooling is very fast and the inverter technology really helps with electricity bills. Installation was smooth and the technician was professional.",
    helpful: 24,
    images: ["/review-ac-installation.jpg", "/review-ac-remote.jpg"],
  },
  {
    id: "2",
    userName: "Fatima Khan",
    rating: 4,
    date: "2024-01-10",
    verified: true,
    title: "Good value for money",
    review:
      "Overall satisfied with the purchase. The AC cools well but takes a bit of time initially. The build quality seems good and the remote is user-friendly.",
    helpful: 18,
    images: [],
  },
  {
    id: "3",
    userName: "Mohammad Hassan",
    rating: 5,
    date: "2024-01-05",
    verified: true,
    title: "Energy efficient and quiet",
    review:
      "Very impressed with the energy efficiency. My electricity bill has actually decreased compared to my old AC. The operation is very quiet, perfect for bedroom use.",
    helpful: 31,
    images: ["/review-electricity-bill.jpg"],
  },
]

export default function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(0)

  const ratingBreakdown = [
    { stars: 5, count: 156, percentage: 67 },
    { stars: 4, count: 45, percentage: 19 },
    { stars: 3, count: 23, percentage: 10 },
    { stars: 2, count: 7, percentage: 3 },
    { stars: 1, count: 3, percentage: 1 },
  ]

  const filteredReviews = filterRating ? mockReviews.filter((review) => review.rating === filterRating) : mockReviews

  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Customer Reviews & Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Rating Summary */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">{rating}</div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mt-1">{reviewCount} reviews</p>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-2">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <span className="text-sm w-6">{item.stars}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Actions */}
            <div className="space-y-4">
              <Button onClick={() => setShowReviewForm(!showReviewForm)} className="w-full">
                Write a Review
              </Button>

              {/* Filter Options */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Filter by rating:</span>
                <div className="flex gap-1">
                  {[5, 4, 3, 2, 1].map((stars) => (
                    <Button
                      key={stars}
                      variant={filterRating === stars ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterRating(filterRating === stars ? null : stars)}
                    >
                      {stars}★
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-4">Write Your Review</h4>

              {/* Rating Input */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setNewRating(star)} className="p-1">
                      <Star
                        className={`w-6 h-6 ${star <= newRating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your experience with this product..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <Button>Submit Review</Button>
                <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="glass-card">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{review.userName}</span>
                    {review.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified Purchase
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4">{review.review}</p>

              {/* Review Images */}
              {review.images.length > 0 && (
                <div className="flex gap-2 mb-4">
                  {review.images.map((image, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Review image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  Helpful ({review.helpful})
                </Button>
                <Button variant="ghost" size="sm">
                  Report
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
