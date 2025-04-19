"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Sample data - in a real app, this would come from an API
const industryData = [
  { name: "電子製造業", value: 32, color: "#14b8a6" },
  { name: "紡織業", value: 24, color: "#3b82f6" },
  { name: "食品飲料業", value: 18, color: "#22c55e" },
  { name: "化學工業", value: 15, color: "#eab308" },
  { name: "其他產業", value: 11, color: "#ef4444" },
]

interface IndustryPieChartProps {
  className?: string
}

export function IndustryPieChart({ className }: IndustryPieChartProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={industryData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
          >
            {industryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => [`${value}%`, "佔比"]}
            contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
          />
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ fontSize: '12px', paddingLeft: '10px' }}
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
} 