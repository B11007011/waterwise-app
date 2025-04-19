"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Sample data - in a real app, this would come from an API
const regionData = [
  { region: "台北市", value: 2150000 },
  { region: "新北市", value: 1850000 },
  { region: "桃園市", value: 1450000 },
  { region: "台中市", value: 1250000 },
  { region: "高雄市", value: 1100000 },
  { region: "其他地區", value: 950000 },
]

const customValueFormatter = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M L`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K L`
  }
  return `${value} L`
}

interface RegionBarChartProps {
  className?: string
}

export function RegionBarChart({ className }: RegionBarChartProps) {
  return (
    <div className={`w-full h-full min-h-[300px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={regionData}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
          <XAxis 
            type="number" 
            tickFormatter={customValueFormatter}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            type="category" 
            dataKey="region" 
            tick={{ fontSize: 11 }}
            width={60}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [customValueFormatter(value), "用水量"]}
            contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}
            iconType="circle"
            iconSize={7}
          />
          <Bar 
            name="各地區用水量" 
            dataKey="value" 
            fill="#14b8a6" 
            radius={[0, 4, 4, 0]}
            barSize={14}
            maxBarSize={18}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 