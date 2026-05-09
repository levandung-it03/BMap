import { CheckCircle2 } from 'lucide-react'

export function VerifiedBadge() {
  return (
    <div className="flex items-center gap-1 inline-flex">
      <CheckCircle2 className="w-4 h-4" style={{ color: '#1D4ED8' }} />
      <span className="text-xs font-semibold" style={{ color: '#1D4ED8' }}>
        Verified
      </span>
    </div>
  )
}
