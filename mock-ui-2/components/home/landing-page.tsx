'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  BookOpen,
  MessageSquare,
  Users,
  Zap,
  TrendingUp,
  Shield,
  ArrowRight,
} from 'lucide-react'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
              U
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">UniReview</span>
          </div>
          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            onClick={() => window.location.assign('/login')}
          >
            Sign In <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground text-balance">
            Discover Your Perfect University
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Read authentic reviews from students, explore detailed analytics, and connect with your future university community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base gap-2"
              onClick={() => window.location.assign('/login')}
            >
              Get Started <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              onClick={() => {
                document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-card/50 py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Universities Listed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10K+</div>
              <p className="text-muted-foreground">Student Reviews</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">500+</div>
              <p className="text-muted-foreground">Active Community Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
          Why Choose UniReview?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <Card className="p-6 bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Comprehensive Reviews
            </h3>
            <p className="text-muted-foreground text-sm">
              Read detailed student reviews covering academics, facilities, campus life, and career outcomes.
            </p>
          </Card>

          {/* Feature 2 */}
          <Card className="p-6 bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Data Analytics
            </h3>
            <p className="text-muted-foreground text-sm">
              Visualize enrollment trends, university strengths, and key metrics to make informed decisions.
            </p>
          </Card>

          {/* Feature 3 */}
          <Card className="p-6 bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Community
            </h3>
            <p className="text-muted-foreground text-sm">
              Connect with thousands of students, ask questions, and share your university experiences.
            </p>
          </Card>

          {/* Feature 4 */}
          <Card className="p-6 bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Discussion Forums
            </h3>
            <p className="text-muted-foreground text-sm">
              Engage in meaningful conversations about university life, majors, and career paths.
            </p>
          </Card>

          {/* Feature 5 */}
          <Card className="p-6 bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Real-time Updates
            </h3>
            <p className="text-muted-foreground text-sm">
              Stay informed with new reviews, community posts, and replies to your contributions.
            </p>
          </Card>

          {/* Feature 6 */}
          <Card className="p-6 bg-card shadow-sm border-0 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Verified Reviews
            </h3>
            <p className="text-muted-foreground text-sm">
              All reviews are verified to ensure authenticity and help you get honest insights.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-card/50 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Explore Vietnam&apos;s Top Universities?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students making informed decisions about their education.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 text-base gap-2"
            onClick={() => window.location.assign('/login')}
          >
            Sign In & Explore <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-muted bg-background">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-muted-foreground">
          <p>UniReview © 2024. Making university selection easier for Vietnamese students.</p>
        </div>
      </footer>
    </div>
  )
}
