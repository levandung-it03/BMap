import { Crown } from 'lucide-react'

export function Top100Badge() {
  return (
    <div className="flex items-center gap-1 inline-flex">
      <Crown className="w-4 h-4" style={{ color: '#EA580C' }} />
      <span className="text-xs font-semibold" style={{ color: '#EA580C' }}>
        Top 100
      </span>
    </div>
  )
}
