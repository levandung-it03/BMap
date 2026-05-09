import React from 'react'

interface UniversityLogoProps {
  universityName: string
  size?: 'sm' | 'md' | 'lg'
}

export function UniversityLogo({ universityName, size = 'md' }: UniversityLogoProps) {
  // Generate initials from university name
  const initials = universityName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  // Define size classes
  const sizeClasses = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-16 h-16 text-lg',
    lg: 'w-24 h-24 text-2xl',
  }

  // Color palette for different universities (using HSL for consistency)
  const colorMap: Record<string, { bg: string; text: string }> = {
    HUST: { bg: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-700 dark:text-blue-200' },
    HCMUT: { bg: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-700 dark:text-purple-200' },
    VNU: { bg: 'bg-teal-100 dark:bg-teal-900', text: 'text-teal-700 dark:text-teal-200' },
    HUAF: { bg: 'bg-green-100 dark:bg-green-900', text: 'text-green-700 dark:text-green-200' },
    MUST: { bg: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-700 dark:text-orange-200' },
  }

  const colors = colorMap[initials] || { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-700 dark:text-slate-200' }

  return (
    <div
      className={`${sizeClasses[size]} ${colors.bg} ${colors.text} flex items-center justify-center rounded-lg font-bold border-2 border-primary`}
    >
      {initials}
    </div>
  )
}
