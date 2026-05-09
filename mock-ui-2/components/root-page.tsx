'use client'

import { useState, useEffect } from 'react'
import { DashboardPage } from './dashboard/dashboard-page'
import { LandingPage } from './home/landing-page'
import { AuthPageService } from '@/services/auth.page.service'

export function RootPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [initialTab, setInitialTab] = useState<string | null>(null)

  useEffect(() => {
    const authorized = AuthPageService.isAuthorized(localStorage)
    setIsAuthorized(authorized)
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#signin')) {
        AuthPageService.setAuthorized(localStorage)
        setIsAuthorized(true)
        setInitialTab(hash.includes('-') ? hash.split('-')[1] : null)
      }
    }

    handleHashChange()
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-background" />
  }

  return isAuthorized ? <DashboardPage initialTab={initialTab} /> : <LandingPage />
}
