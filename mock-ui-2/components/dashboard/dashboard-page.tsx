'use client'

import { useState, useEffect } from 'react'
import { universities, getUniversityById } from '@/lib/mock-data'
import { SidebarNav } from './sidebar-nav'
import { TopBar } from './top-bar'
import { SearchOverlay } from './search-overlay'
import { UniversityTabs } from './university-tabs'
import { MobileNav } from './mobile-nav'
import { UserProfile } from './user-profile'
import { UniversityLogo } from './university-logo'
import { CategoryBadge } from './category-badge'
import { Card } from '@/components/ui/card'
import { ArrowLeft, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DashboardPageProps {
  initialTab?: string | null
}

export function DashboardPage({ initialTab }: DashboardPageProps) {
  const [currentPage, setCurrentPage] = useState('explore')
  const [selectedTab, setSelectedTab] = useState(initialTab || 'overview')
  const [selectedUniversity, setSelectedUniversity] = useState<string | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const university = selectedUniversity ? getUniversityById(selectedUniversity) : null

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SidebarNav currentPage={currentPage} onPageChange={setCurrentPage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-0">
        {/* Top Bar */}
        <TopBar
          onSearchFocus={() => setIsSearchOpen(true)}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Search Overlay */}
        <SearchOverlay
          isOpen={isSearchOpen}
          searchQuery={searchQuery}
          onClose={() => setIsSearchOpen(false)}
          onSelectUniversity={(id) => {
            setSelectedUniversity(id)
            setCurrentPage('explore')
            setSearchQuery('')
          }}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto mb-16 md:mb-0">
          {currentPage === 'portfolio' ? (
            // Portfolio Page
            <div className="p-4 md:p-6 max-w-4xl mx-auto w-full">
              <UserProfile />
            </div>
          ) : university ? (
            // University Detail Page
            <div className="p-4 md:p-6 max-w-6xl mx-auto w-full">
              <div className="flex items-center gap-4 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedUniversity(null)
                    setSearchQuery('')
                  }}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">{university.name}</h1>
                  <p className="text-muted-foreground mt-1">{university.description}</p>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                <Card className="p-3 bg-card shadow-sm border-0">
                  <p className="text-xs font-medium text-muted-foreground">Overall Rating</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {university.rating.toFixed(1)} / 5.0
                  </p>
                </Card>
                <Card className="p-3 bg-card shadow-sm border-0">
                  <p className="text-xs font-medium text-muted-foreground">Students</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {(university.studentCount / 1000).toFixed(1)}K
                  </p>
                </Card>
                <Card className="p-3 bg-card shadow-sm border-0 col-span-2 md:col-span-1">
                  <p className="text-xs font-medium text-muted-foreground">Reviews</p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {university.reviews.length}
                  </p>
                </Card>
              </div>

              {/* Tabs Section */}
              <UniversityTabs university={university} initialTab={selectedTab} />
            </div>
          ) : (
            // Explore Page
            <div className="p-4 md:p-6 max-w-6xl mx-auto w-full">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Explore Universities
                </h1>
                <p className="text-muted-foreground">
                  Search for your ideal university and read reviews from students
                </p>
              </div>

              {/* Universities Grid */}
              <div className="grid grid-cols-1 gap-4">
                {universities.map((uni) => (
                  <Card
                    key={uni.id}
                    className="p-6 bg-card shadow-md hover:shadow-lg border-0 transition-all cursor-pointer"
                    onClick={() => setSelectedUniversity(uni.id)}
                  >
                    <div className="space-y-4">
                      {/* Header: Logo, Title, and Rating */}
                      <div className="flex gap-6">
                        <UniversityLogo universityName={uni.name} size="md" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h2 className="text-2xl font-bold text-foreground leading-tight">{uni.name}</h2>
                            <div className="flex-shrink-0 bg-muted rounded-lg px-3 py-1">
                              <p className="text-lg font-bold text-primary">{uni.rating.toFixed(1)}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{uni.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Category Pills */}
                      <div className="flex gap-3 flex-wrap">
                        {uni.categories.map((cat) => (
                          <CategoryBadge key={cat.label} label={cat.label} color={cat.color} />
                        ))}
                      </div>

                      {/* Stats Footer */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-muted-foreground text-xs">Students</p>
                            <p className="font-bold text-foreground">{(uni.studentCount / 1000).toFixed(1)}K</p>
                          </div>
                          <div className="text-muted-foreground">•</div>
                          <div>
                            <p className="text-muted-foreground text-xs">Majors</p>
                            <p className="font-bold text-foreground">{uni.majorCount}+</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  )
}
