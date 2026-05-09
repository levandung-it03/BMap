'use client'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

interface StrengthData {
  facilities: number
  career: number
  social: number
  teacher: number
}

interface StrengthChartProps {
  data: StrengthData
}

export function StrengthChart({ data }: StrengthChartProps) {
  const chartData = [
    { name: 'Facilities', value: data.facilities },
    { name: 'Career', value: data.career },
    { name: 'Social', value: data.social },
    { name: 'Teachers', value: data.teacher },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="name" stroke="var(--muted-foreground)" />
        <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="var(--muted-foreground)" />
        <Radar
          name="Strength"
          dataKey="value"
          stroke="var(--chart-2)"
          fill="var(--chart-2)"
          fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: `1px solid var(--border)`,
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}
