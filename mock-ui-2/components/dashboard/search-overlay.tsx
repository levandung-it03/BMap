'use client'

import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { universities } from '@/lib/mock-data'
import { Button } from '@/components/ui/button'

interface SearchOverlayProps {
  isOpen: boolean
  searchQuery: string
  onClose: () => void
  onSelectUniversity: (universityId: string) => void
}

export function SearchOverlay({
  isOpen,
  searchQuery,
  onClose,
  onSelectUniversity,
}: SearchOverlayProps) {
  const [filteredUniversities, setFilteredUniversities] = useState(universities)

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredUniversities(
        universities.filter((uni) =>
          uni.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    } else {
      setFilteredUniversities(universities)
    }
  }, [searchQuery])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Search results panel */}
      <div className="fixed top-20 left-4 right-4 md:left-auto md:right-1/2 md:translate-x-1/2 w-auto max-w-2xl bg-card rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto border-0">
        {filteredUniversities.length > 0 ? (
          <div className="divide-y divide-muted">
            {filteredUniversities.map((uni) => (
              <button
                key={uni.id}
                onClick={() => {
                  onSelectUniversity(uni.id)
                  onClose()
                }}
                className="w-full flex items-start gap-4 p-4 hover:bg-accent/10 transition-colors text-left"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">{uni.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {uni.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-xs font-medium text-accent">
                      ★ {uni.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {uni.studentCount.toLocaleString()} students
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-2" />
              </button>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No universities found</p>
          </div>
        )}
      </div>
    </>
  )
}
