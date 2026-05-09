import { LucideIcon, BookOpen, Building2, MessageCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CategoryBadgeProps {
  label: string
  color: 'blue' | 'green' | 'purple'
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  green: {
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: 'text-emerald-600 dark:text-emerald-400',
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
    icon: 'text-purple-600 dark:text-purple-400',
  },
}

const iconMap: Record<string, LucideIcon> = {
  'Major': BookOpen,
  'Facility': Building2,
  'Confession': MessageCircle,
}

export function CategoryBadge({ label, color }: CategoryBadgeProps) {
  const router = useRouter()
  const colors = colorClasses[color]
  const Icon = iconMap[label] || BookOpen

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const tabMap: Record<string, string> = {
      'Major': 'majors',
      'Facility': 'facilities',
      'Confession': 'community',
    }
    const tabName = tabMap[label] || 'overview'
    router.push(`#signin-${tabName}`)
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity cursor-pointer`}
    >
      <Icon className={`w-4 h-4 ${colors.icon}`} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}
