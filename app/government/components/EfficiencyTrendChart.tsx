"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Sample data - in a real app, this would come from an API
const efficiencyData = [
  { month: "Jan", electronics: 84, textile: 79, food: 82, chemical: 75 },
  { month: "Feb", electronics: 85, textile: 80, food: 83, chemical: 76 },
  { month: "Mar", electronics: 86, textile: 81, food: 82, chemical: 75 },
  { month: "Apr", electronics: 87, textile: 82, food: 83, chemical: 77 },
  { month: "May", electronics: 88, textile: 83, food: 84, chemical: 78 },
  { month: "Jun", electronics: 89, textile: 83, food: 85, chemical: 79 },
  { month: "Jul", electronics: 90, textile: 84, food: 86, chemical: 80 },
  { month: "Aug", electronics: 91, textile: 85, food: 87, chemical: 81 },
  { month: "Sep", electronics: 92, textile: 86, food: 88, chemical: 82 },
  { month: "Oct", electronics: 93, textile: 87, food: 89, chemical: 83 },
  { month: "Nov", electronics: 94, textile: 88, food: 90, chemical: 84 },
  { month: "Dec", electronics: 95, textile: 89, food: 91, chemical: 85 },
]

interface EfficiencyTrendChartProps {
  className?: string
}

export function EfficiencyTrendChart({ className }: EfficiencyTrendChartProps) {
  return (
    <div className={`w-full h-full min-h-[240px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={efficiencyData}
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} />
          <YAxis 
            tickFormatter={(value) => `${value}%`}
            domain={[70, 100]}
            tick={{ fontSize: 10 }}
            width={40}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, "效率"]}
            contentStyle={{ fontSize: '12px' }}
          />
          <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}/>
          <Line 
            name="電子製造業" 
            type="monotone" 
            dataKey="electronics" 
            stroke="#14b8a6" 
            strokeWidth={1.5}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            name="紡織業" 
            type="monotone" 
            dataKey="textile" 
            stroke="#3b82f6" 
            strokeWidth={1.5}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            name="食品飲料業" 
            type="monotone" 
            dataKey="food" 
            stroke="#22c55e" 
            strokeWidth={1.5}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
          <Line 
            name="化學工業" 
            type="monotone" 
            dataKey="chemical" 
            stroke="#eab308" 
            strokeWidth={1.5}
            dot={{ r: 2 }}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 