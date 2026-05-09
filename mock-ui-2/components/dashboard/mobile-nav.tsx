'use client'

import { Home, MessageSquare, Users, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface MobileNavProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function MobileNav({ currentPage, onPageChange }: MobileNavProps) {
  const menuItems = [
    { id: 'explore', label: 'Explore', icon: Home },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-sidebar shadow-lg border-t border-muted md:hidden z-40 flex items-center justify-around px-4">
      {menuItems.map((item) => {
        const Icon = item.icon
        const isActive = currentPage === item.id

        return (
          <button
            key={item.id}
            onClick={() => onPageChange(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all ${
              isActive
                ? 'text-primary'
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
