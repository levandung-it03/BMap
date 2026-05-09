'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface EnrollmentData {
  month: string
  students: number
}

interface EnrollmentChartProps {
  data: EnrollmentData[]
}

export function EnrollmentChart({ data }: EnrollmentChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: 'var(--card)',
            border: `1px solid var(--border)`,
            borderRadius: 'var(--radius)',
          }}
          labelStyle={{ color: 'var(--foreground)' }}
        />
        <Line
          type="monotone"
          dataKey="students"
          stroke="var(--chart-1)"
          dot={{ fill: 'var(--primary)', r: 4 }}
          activeDot={{ r: 6 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
