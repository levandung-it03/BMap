'use client'

import { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getNotifications, getUnreadNotificationCount } from '@/lib/mock-data'
import { Card } from '@/components/ui/card'

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = getNotifications()
  const unreadCount = getUnreadNotificationCount()

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {/* Dropdown Panel */}
      {isOpen && (
        <Card className="absolute right-0 mt-2 w-96 max-h-96 overflow-y-auto shadow-lg border-0 z-50 bg-card">
          {/* Header */}
          <div className="sticky top-0 bg-card p-4 border-b border-muted">
            <h3 className="font-semibold text-foreground">Notifications</h3>
          </div>

          {/* Notifications List */}
          {notifications.length > 0 ? (
            <div className="divide-y divide-muted">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 transition-colors cursor-pointer hover:bg-muted/30 ${
                    !notif.isRead ? 'bg-muted/20' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Avatar */}
                    <div className="text-2xl flex-shrink-0">{notif.avatar || '🔔'}</div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{notif.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notif.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notif.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </div>

                    {/* Unread indicator */}
                    {!notif.isRead && (
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </Card>
      )}
    </div>
  )
}
