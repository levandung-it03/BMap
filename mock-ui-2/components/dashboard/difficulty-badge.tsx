import { Badge } from '@/components/ui/badge'

interface DifficultyBadgeProps {
  difficulty: 'Easy' | 'Hard'
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
  if (difficulty === 'Easy') {
    return (
      <Badge className="bg-green-500/20 text-green-700 hover:bg-green-500/30 dark:text-green-400">
        Easy
      </Badge>
    )
  }

  return (
    <Badge className="bg-orange-500/20 text-orange-700 hover:bg-orange-500/30 dark:text-orange-400">
      Hard
    </Badge>
  )
}
