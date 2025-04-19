"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts"

// Sample data - in a real app, this would come from an API
const policyData = [
  { year: "2023", current: 1630, predicted: 1630, baseline: 1630 },
  { year: "2024", current: 1680, predicted: 1580, baseline: 1650 },
  { year: "2025", current: 1730, predicted: 1520, baseline: 1670 },
  { year: "2026", current: 1780, predicted: 1470, baseline: 1690 },
  { year: "2027", current: 1830, predicted: 1430, baseline: 1710 },
  { year: "2028", current: 1880, predicted: 1390, baseline: 1730 },
]

const customValueFormatter = (value: number) => {
  return `${value}M L`
}

interface PolicySimulationChartProps {
  className?: string
}

export function PolicySimulationChart({ className }: PolicySimulationChartProps) {
  return (
    <div className={`w-full h-full min-h-[240px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={policyData}
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis 
            tickFormatter={customValueFormatter}
            tick={{ fontSize: 11 }}
            width={60}
            domain={['auto', 'auto']}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [customValueFormatter(value), "用水量"]}
            contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            cursor={{ stroke: '#ccc', strokeWidth: 1, strokeDasharray: '5 5' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '11px', marginTop: '10px' }}
            iconType="circle"
            iconSize={8}
          />
          <ReferenceLine 
            y={1630} 
            label={{ value: "現在", position: 'insideTopRight', fontSize: 10 }} 
            stroke="#818cf8" 
            strokeDasharray="3 3" 
            strokeWidth={1}
          />
          <Area 
            type="monotone" 
            dataKey="current" 
            name="不實施政策" 
            stroke="#ef4444" 
            fill="#fca5a5" 
            fillOpacity={0.3}
            strokeWidth={1.5}
          />
          <Area 
            type="monotone" 
            dataKey="predicted" 
            name="實施新政策" 
            stroke="#10b981" 
            fill="#6ee7b7" 
            fillOpacity={0.3}
            strokeWidth={1.5}
          />
          <Area 
            type="monotone" 
            dataKey="baseline" 
            name="維持現有政策" 
            stroke="#f59e0b" 
            fill="#fcd34d" 
            fillOpacity={0.3}
            strokeWidth={1.5}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 