'use client'

import { useState } from 'react'
import { Search, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { NotificationDropdown } from './notification-dropdown'

interface TopBarProps {
  onSearchFocus?: () => void
  searchValue?: string
  onSearchChange?: (value: string) => void
}

export function TopBar({ onSearchFocus, searchValue = '', onSearchChange }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 w-full bg-background shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Search bar - hidden on mobile when sidebar is expanded */}
        <div className="flex-1 max-w-sm ml-12 md:ml-0">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search universities..."
              className="pl-11 pr-4 h-10 bg-muted rounded-full border-0"
              onFocus={onSearchFocus}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-2 ml-4">
          {/* Notification dropdown */}
          <NotificationDropdown />

          {/* User profile dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                <span>My Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
