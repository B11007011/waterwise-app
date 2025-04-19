"use client"

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Sample data - in a real app, this would come from an API
const companyData = [
  { month: "Jan", usage: 310000, average: 280000 },
  { month: "Feb", usage: 290000, average: 275000 },
  { month: "Mar", usage: 305000, average: 285000 },
  { month: "Apr", usage: 320000, average: 290000 },
  { month: "May", usage: 330000, average: 295000 },
  { month: "Jun", usage: 295000, average: 290000 },
  { month: "Jul", usage: 285000, average: 285000 },
  { month: "Aug", usage: 275000, average: 280000 },
  { month: "Sep", usage: 290000, average: 275000 },
  { month: "Oct", usage: 300000, average: 280000 },
  { month: "Nov", usage: 295000, average: 285000 },
  { month: "Dec", usage: 285000, average: 290000 },
]

const customValueFormatter = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M L`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K L`
  }
  return `${value} L`
}

interface CompanyTrendChartProps {
  className?: string
  companyName?: string
}

export function CompanyTrendChart({ className, companyName = "台灣積體電路製造股份有限公司" }: CompanyTrendChartProps) {
  return (
    <div className={`w-full h-full min-h-[240px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={companyData}
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis 
            tickFormatter={customValueFormatter}
            tick={{ fontSize: 10 }}
            width={60}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number) => [customValueFormatter(value), "用水量"]}
            contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            cursor={{ strokeDasharray: '5 5', stroke: '#ccc' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}
            iconType="circle"
            iconSize={7}  
          />
          <Line 
            name={companyName} 
            type="monotone" 
            dataKey="usage" 
            stroke="#14b8a6" 
            strokeWidth={1.5}
            dot={{ r: 2, strokeWidth: 1 }}
            activeDot={{ r: 4, stroke: '#14b8a6', strokeWidth: 1 }}
          />
          <Line 
            name="產業平均" 
            type="monotone" 
            dataKey="average" 
            stroke="#94a3b8" 
            strokeWidth={1}
            dot={{ r: 1.5, strokeWidth: 0.5 }}
            strokeDasharray="5 5"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
} 