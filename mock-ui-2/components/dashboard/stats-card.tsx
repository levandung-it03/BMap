import { Card } from '@/components/ui/card'

interface StatsCardProps {
  label: string
  value: number | string
  unit?: string
  icon?: React.ReactNode
}

export function StatsCard({ label, value, unit = '', icon }: StatsCardProps) {
  return (
    <Card className="p-4 bg-card/50 border-border/50">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {label}
          </p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {typeof value === 'number' ? value.toFixed(1) : value}
            {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
        {icon && <div className="text-accent">{icon}</div>}
      </div>
    </Card>
  )
}
