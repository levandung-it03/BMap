'use client'

import { currentUser, getUserActivities } from '@/lib/mock-data'
import { VerifiedBadge } from './verified-badge'
import { Top100Badge } from './top-100-badge'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Edit2, MessageSquare, Users } from 'lucide-react'

export function UserProfile() {
  const activities = getUserActivities()

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Profile Header Card */}
      <Card className="p-8 bg-card shadow-sm border-0">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Avatar */}
          <div className="text-6xl flex-shrink-0">{currentUser.avatar}</div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold text-foreground">{currentUser.username}</h1>
              <div className="flex gap-2 flex-wrap">
                {currentUser.isVerified && <VerifiedBadge />}
                {currentUser.isTop100 && <Top100Badge />}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4">{currentUser.email}</p>
            <p className="text-foreground mb-4">{currentUser.bio}</p>

            {/* Stats */}
            <div className="flex gap-6 mb-4">
              <div>
                <p className="text-lg font-bold text-foreground">{currentUser.totalReviews}</p>
                <p className="text-xs text-muted-foreground">Reviews</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{currentUser.totalPosts}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{currentUser.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>

            {/* Member since */}
            <p className="text-xs text-muted-foreground">
              Member since {new Date(currentUser.joinDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          {/* Edit Button */}
          <Button className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground md:self-start">
            <Edit2 className="w-4 h-4" />
            <span className="hidden sm:inline">Edit Profile</span>
            <span className="sm:hidden">Edit</span>
          </Button>
        </div>
      </Card>

      {/* Recent Activities Section */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Recent Activities</h2>

        <div className="space-y-2">
          {activities.map((activity, index) => (
            <Card
              key={activity.id}
              className="p-4 bg-card shadow-sm border-0 hover:shadow-md transition-shadow hover:bg-muted/30 cursor-pointer"
            >
              <div className="flex items-start gap-3">
                {/* Activity Type Icon */}
                <div className="flex-shrink-0 mt-1">
                  {activity.type === 'reply' && <MessageSquare className="w-4 h-4 text-primary" />}
                  {activity.type === 'post' && <Edit2 className="w-4 h-4 text-primary" />}
                  {activity.type === 'review' && <Edit2 className="w-4 h-4 text-primary" />}
                  {activity.type === 'like' && <Users className="w-4 h-4 text-accent" />}
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{activity.description}</span>{' '}
                    <span className="text-muted-foreground">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: activity.date.split('-')[0] !== new Date().getFullYear().toString() ? 'numeric' : undefined,
                    })}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
