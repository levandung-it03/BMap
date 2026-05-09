'use client'

import { useState } from 'react'
import { University } from '@/lib/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { StatsCard } from './stats-card'
import { EnrollmentChart } from './enrollment-chart'
import { StrengthChart } from './strength-chart'
import { ReviewFeed } from './review-feed'
import { CommunityFeed } from './community-feed'
import { PostModal } from './post-modal'
import { AboutUniversity } from './about-university'
import { getCommunityPosts } from '@/lib/mock-data'
import { Users, Building2, BookMarked, MessageSquare } from 'lucide-react'

interface UniversityTabsProps {
  university: University
  initialTab?: string
}

export function UniversityTabs({ university, initialTab }: UniversityTabsProps) {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [communityPosts, setCommunityPosts] = useState(getCommunityPosts())

  const handlePostSubmit = (content: string) => {
    // In a real app, this would be sent to the backend
    console.log('[v0] New post submitted:', content)
  }

  return (
    <>
      {/* About University Section */}
      <AboutUniversity universityName={university.name} about={university.about} />

      <Tabs defaultValue={initialTab || 'overview'} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card shadow-sm border-0">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="majors" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <BookMarked className="w-4 h-4" />
            <span className="hidden sm:inline">Majors</span>
          </TabsTrigger>
          <TabsTrigger value="facilities" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Facilities</span>
          </TabsTrigger>
          <TabsTrigger value="community" className="flex items-center gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Community</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">University Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatsCard
                label="Facilities Rating"
                value={university.stats.facilities}
                unit="/ 5.0"
              />
              <StatsCard
                label="Teachers Rating"
                value={university.stats.teachers}
                unit="/ 5.0"
              />
              <StatsCard
                label="Tuition Value"
                value={university.stats.tuition}
                unit="/ 5.0"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Enrollment Trend</h3>
            <Card className="p-4 bg-card shadow-sm border-0">
              <EnrollmentChart data={university.enrollmentTrend} />
            </Card>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">
              University Strengths
            </h3>
            <Card className="p-4 bg-card shadow-sm border-0">
              <StrengthChart data={university.strengths} />
            </Card>
          </div>
        </TabsContent>

        {/* Majors & Academics Tab */}
        <TabsContent value="majors" className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">Reviews</h3>
            <ReviewFeed reviews={university.reviews} />
          </div>
        </TabsContent>

        {/* Facilities Tab */}
        <TabsContent value="facilities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="bg-muted/40 shadow-sm border-0 aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Campus Image {i}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Facility Ratings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatsCard label="Library Rating" value={university.stats.facilities} unit="/ 5.0" />
              <StatsCard label="Sports Complex" value={4.3} unit="/ 5.0" />
              <StatsCard label="Cafeteria" value={4.1} unit="/ 5.0" />
              <StatsCard label="Dorms" value={4.4} unit="/ 5.0" />
            </div>
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Community Feed</h3>
            <Button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-primary hover:bg-primary/90"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Post
            </Button>
          </div>
          <CommunityFeed posts={communityPosts} />
        </TabsContent>
      </Tabs>

      {/* Post Modal */}
      <PostModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </>
  )
}
