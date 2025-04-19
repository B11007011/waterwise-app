"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

// Sample data - in a real app, this would come from an API
const categoryData = [
  { name: "洗髮精", value: 350, display: "350L" },
  { name: "T恤", value: 2700, display: "2,700L" },
  { name: "筆電", value: 9800, display: "9,800L" },
  { name: "寶特瓶", value: 8, display: "8L" },
  { name: "手機", value: 1280, display: "1,280L" },
  { name: "牛仔褲", value: 3400, display: "3,400L" },
  { name: "洗碗精", value: 180, display: "180L" },
  { name: "洗衣機", value: 5200, display: "5,200L" },
]

interface ProductCategoryChartProps {
  className?: string
}

export function ProductCategoryChart({ className }: ProductCategoryChartProps) {
  return (
    <div className={`w-full h-full min-h-[300px] ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={categoryData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            label={{ 
              value: "平均用水量 (L)", 
              angle: -90, 
              position: "insideLeft", 
              style: { textAnchor: 'middle', fontSize: 12 } 
            }}
            tick={{ fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [`${value}L`, "平均用水量"]}
            contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            cursor={{ fill: 'rgba(0,0,0,0.05)' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}
            iconType="circle"
            iconSize={7}
          />
          <Bar 
            name="產品平均用水量" 
            dataKey="value" 
            fill="#0ea5e9" 
            radius={[4, 4, 0, 0]}
            barSize={16}
            maxBarSize={22}
            label={{ 
              position: 'top', 
              fontSize: 10, 
              formatter: (entry: any) => entry.display
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
} 