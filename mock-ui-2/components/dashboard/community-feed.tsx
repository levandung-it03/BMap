'use client'

import { CommunityPost } from '@/lib/mock-data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ThumbsUp, MessageCircle, TrendingUp } from 'lucide-react'

interface CommunityFeedProps {
  posts: CommunityPost[]
}

export function CommunityFeed({ posts }: CommunityFeedProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published':
        return 'bg-green-500/20 text-green-700 dark:text-green-400'
      case 'Pending AI':
        return 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
      case 'Admin Review':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400'
      default:
        return 'bg-gray-500/20'
    }
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <Card
          key={post.id}
          className="p-4 bg-card shadow-sm border-0 hover:shadow-md transition-shadow cursor-pointer"
        >
          <div className="space-y-3">
            {/* Header with status badge */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  {post.author} • {post.date}
                </p>
                {post.trending && (
                  <div className="flex items-center gap-1 mt-1 text-xs text-accent">
                    <TrendingUp className="w-3 h-3" />
                    <span>Trending</span>
                  </div>
                )}
              </div>
              <Badge className={getStatusColor()}>{post.status}</Badge>
            </div>

            {/* Content */}
            <p className="text-sm text-foreground">{post.content}</p>

            {/* Engagement stats */}
            <div className="flex items-center gap-4 pt-2 border-t border-muted">
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.votes}</span>
              </button>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>Reply</span>
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
