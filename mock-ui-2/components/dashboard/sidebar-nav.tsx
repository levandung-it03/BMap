'use client'

import { BookOpen, MessageSquare, Users, UtensilsCrossed, User, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarNavProps {
  currentPage: string
  onPageChange: (page: string) => void
}

export function SidebarNav({ currentPage, onPageChange }: SidebarNavProps) {
  const menuItems = [
    { id: 'explore', label: 'Explore', icon: BookOpen },
    { id: 'reviews', label: 'Review Chi Tiết', icon: MessageSquare },
    { id: 'community', label: 'Cộng Đồng Tám Nhảm', icon: Users },
    { id: 'portfolio', label: 'Portfolio', icon: User },
    { id: 'food', label: 'Uni Food', icon: UtensilsCrossed, disabled: true },
  ]

  const handleItemClick = (id: string, disabled?: boolean) => {
    if (!disabled) {
      onPageChange(id)
    }
  }

  const handleSignOut = () => {
    localStorage.removeItem('unireview_authorized')
    window.location.reload()
  }

  return (
    <aside className="hidden md:flex w-64 bg-background border-r border-border h-screen flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">UniReview</h1>
        <p className="text-xs text-muted-foreground mt-1">Vietnam&apos;s #1 Uni Platform</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          const isDisabled = item.disabled

          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id, isDisabled)}
              disabled={isDisabled}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                isDisabled
                  ? 'text-muted-foreground/40 cursor-not-allowed'
                  : isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted',
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
              {isDisabled && <span className="ml-auto text-xs">Soon</span>}
            </button>
          )
        })}
      </nav>

      <div className="border-t border-border p-4 space-y-2">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
