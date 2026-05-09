import React from 'react'
import { Card } from '@/components/ui/card'
import { UniversityLogo } from './university-logo'

interface AboutUniversityProps {
  universityName: string
  about: string
}

export function AboutUniversity({ universityName, about }: AboutUniversityProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-start gap-4">
        <UniversityLogo universityName={universityName} size="md" />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-foreground">{universityName}</h2>
          <p className="text-sm text-muted-foreground mt-1">Official Information</p>
        </div>
      </div>

      <Card className="p-6 bg-muted/30 shadow-sm border-0">
        <h3 className="text-lg font-semibold text-foreground mb-3">About this University</h3>
        <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
          {about}
        </p>
      </Card>
    </div>
  )
}
