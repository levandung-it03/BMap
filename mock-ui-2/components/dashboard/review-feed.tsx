'use client'

import { Review } from '@/lib/mock-data'
import { Card } from '@/components/ui/card'
import { DifficultyBadge } from './difficulty-badge'
import { Star } from 'lucide-react'

interface ReviewFeedProps {
  reviews: Review[]
}

export function ReviewFeed({ reviews }: ReviewFeedProps) {
  return (
    <div className="space-y-3">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card
            key={review.id}
            className="p-4 bg-card shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-foreground">{review.major}</h3>
                  <DifficultyBadge difficulty={review.difficulty} />
                </div>

                <p className="text-sm text-muted-foreground mt-1">
                  taught by <span className="font-medium">{review.teacher}</span>
                </p>

                <p className="text-sm text-foreground mt-2 line-clamp-3">{review.content}</p>

                <p className="text-xs text-muted-foreground mt-3">{review.date}</p>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-semibold text-foreground">
                  {review.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="p-8 text-center text-muted-foreground">No reviews yet</div>
      )}
    </div>
  )
}
