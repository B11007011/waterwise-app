"use client"

import { useState } from "react"
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Sample data - in a real app, this would come from an API
const waterUsageData = [
  { name: "Jan", usage: 400000, target: 450000, efficiency: 88 },
  { name: "Feb", usage: 380000, target: 450000, efficiency: 90 },
  { name: "Mar", usage: 420000, target: 450000, efficiency: 87 },
  { name: "Apr", usage: 450000, target: 450000, efficiency: 85 },
  { name: "May", usage: 470000, target: 450000, efficiency: 84 },
  { name: "Jun", usage: 440000, target: 450000, efficiency: 86 },
  { name: "Jul", usage: 420000, target: 450000, efficiency: 89 },
  { name: "Aug", usage: 390000, target: 450000, efficiency: 91 },
  { name: "Sep", usage: 370000, target: 450000, efficiency: 93 },
  { name: "Oct", usage: 360000, target: 450000, efficiency: 94 },
  { name: "Nov", usage: 350000, target: 450000, efficiency: 96 },
  { name: "Dec", usage: 340000, target: 450000, efficiency: 97 },
]

const productLineData = [
  { name: "製程A", usage: 120000, efficiency: 93 },
  { name: "製程B", usage: 85000, efficiency: 87 },
  { name: "製程C", usage: 45000, efficiency: 91 },
  { name: "製程D", usage: 25000, efficiency: 94 },
  { name: "製程E", usage: 15000, efficiency: 89 },
]

const customValueFormatter = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M L`
  } else if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K L`
  }
  return `${value} L`
}

interface WaterUsageChartProps {
  className?: string
}

export default function WaterUsageChart({ className }: WaterUsageChartProps) {
  const [chartView, setChartView] = useState("monthly")
  const [timeframe, setTimeframe] = useState("year")
  
  const getFilteredData = () => {
    if (timeframe === "quarter") {
      return waterUsageData.slice(waterUsageData.length - 3)
    } else if (timeframe === "halfYear") {
      return waterUsageData.slice(waterUsageData.length - 6)
    } else if (timeframe === "month") {
      return waterUsageData.slice(waterUsageData.length - 1)
    }
    return waterUsageData
  }

  // Function to determine chart height based on screen size
  const getChartHeight = () => {
    // Use CSS media query-like logic that will be calculated at runtime on client
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768 ? 220 : 300;
    }
    return 300; // Default for SSR
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <CardTitle className="text-lg font-semibold">用水量分析</CardTitle>
            <CardDescription>監控各時段用水量和效率</CardDescription>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-full sm:w-[140px]">
                <SelectValue placeholder="選擇時段" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">近一個月</SelectItem>
                <SelectItem value="quarter">近三個月</SelectItem>
                <SelectItem value="halfYear">近半年</SelectItem>
                <SelectItem value="year">一年</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:px-2">
        <Tabs defaultValue="monthly" onValueChange={setChartView} className="w-full">
          <div className="px-2 sm:px-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="monthly" className="text-xs sm:text-sm">月度用水量</TabsTrigger>
              <TabsTrigger value="efficiency" className="text-xs sm:text-sm">用水效率</TabsTrigger>
              <TabsTrigger value="productLine" className="text-xs sm:text-sm">製程分析</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="monthly" className="mt-4">
            <div className="h-[220px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getFilteredData()}
                  margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
                  barGap={8}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis
                    tickFormatter={customValueFormatter}
                    width={60}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [customValueFormatter(value), "用水量"]}
                    labelFormatter={(label) => `${label}月`}
                    contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}/>
                  <Bar 
                    name="實際用水量" 
                    dataKey="usage" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                    barSize={16}
                    maxBarSize={28}
                  />
                  <Bar 
                    name="目標用水量" 
                    dataKey="target" 
                    fill="#94a3b8" 
                    radius={[4, 4, 0, 0]} 
                    fillOpacity={0.35}
                    barSize={16} 
                    maxBarSize={28}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="px-4 py-2 mt-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                與去年同期相比，用水量減少了 <span className="text-green-500 font-medium">8.5%</span>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="efficiency" className="mt-4">
            <div className="h-[220px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getFilteredData()}
                  margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis
                    domain={[80, 100]}
                    tickFormatter={(value) => `${value}%`}
                    width={40}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, "效率"]}
                    labelFormatter={(label) => `${label}月`}
                    contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    cursor={{ strokeDasharray: '5 5' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}/>
                  <Line
                    type="monotone"
                    dataKey="efficiency"
                    name="用水效率"
                    stroke="#10b981"
                    strokeWidth={1.5}
                    dot={{ r: 2, strokeWidth: 1 }}
                    activeDot={{ r: 4, stroke: '#10b981', strokeWidth: 1 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="px-4 py-2 mt-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                效率持續提升中，已達成年度目標的 <span className="text-green-500 font-medium">94%</span>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="productLine" className="mt-4">
            <div className="h-[220px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productLineData}
                  margin={{ top: 10, right: 15, left: 0, bottom: 0 }}
                  layout="vertical"
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
                    dataKey="name" 
                    width={46}
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [customValueFormatter(value), "用水量"]}
                    contentStyle={{ fontSize: '12px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px', marginTop: '10px' }}/>
                  <Bar 
                    name="用水量" 
                    dataKey="usage" 
                    fill="#3b82f6" 
                    radius={[0, 4, 4, 0]}
                    barSize={12}
                    maxBarSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="px-4 py-2 mt-2">
              <p className="text-xs sm:text-sm text-muted-foreground">
                製程A用水量最高，建議重點優化此製程節水效率
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 