"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, BarChart3, Droplet, FileUp, Home, LogOut, Menu, Settings } from "lucide-react"
import WaterUsageChart from "./components/WaterUsageChart"
import { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"

// Interfaces for component props
interface SidebarNavItemProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface UsageMetricCardProps {
  title: string;
  description: string;
  value: string;
  changeValue: string;
  changeDirection: 'up' | 'down';
}

interface ProductLineItemProps {
  name: string;
  volume: string;
  change: string;
  width: string;
  quantity: string;
  unitMeasure: string;
}

interface OptimizationSuggestionProps {
  color: string;
  title: string;
  description: string;
  investment: string;
  savings: string;
}

// Extract SidebarNavItem component for better maintainability
const SidebarNavItem = ({ icon: Icon, label, active, onClick }: SidebarNavItemProps) => (
  <Button
    variant="ghost"
    className={`w-full justify-start ${active ? 'bg-teal-50 text-teal-600 hover:bg-teal-100 hover:text-teal-700' : 'hover:bg-gray-100'}`}
    onClick={onClick}
  >
    <Icon className="mr-2 h-5 w-5" />
    {label}
  </Button>
)

// Extract UsageMetricCard component for better reusability
const UsageMetricCard = ({ title, description, value, changeValue, changeDirection }: UsageMetricCardProps) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="flex items-end gap-2">
        <span className="text-2xl md:text-3xl font-bold">{value}</span>
        <div className={`flex items-center ${changeDirection === 'up' ? (title.includes('效率') ? 'text-green-500' : 'text-red-500') : (title.includes('效率') ? 'text-red-500' : 'text-green-500')} text-sm`}>
          {changeDirection === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          <span>{changeValue}</span>
        </div>
      </div>
    </CardContent>
  </Card>
)

// Extract ProductLineItem component
const ProductLineItem = ({ name, volume, change, width, quantity, unitMeasure }: ProductLineItemProps) => (
  <div>
    <div className="flex justify-between mb-1">
      <span>{name}</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">{volume}</span>
        <span className={`text-xs ${change.startsWith('↓') ? 'text-green-500' : 'text-red-500'}`}>{change}</span>
      </div>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-blue-500 rounded-full" style={{ width }}></div>
    </div>
    <div className="flex justify-between mt-1 text-xs text-gray-500">
      <span>{quantity}</span>
      <span>{unitMeasure}</span>
    </div>
  </div>
)

// Extract OptimizationSuggestion component
const OptimizationSuggestion = ({ color, title, description, investment, savings }: OptimizationSuggestionProps) => (
  <div className={`p-4 border border-${color}-100 bg-${color}-50 rounded-md`}>
    <h4 className={`text-${color}-700 font-medium mb-2`}>{title}</h4>
    <p className={`text-sm text-${color}-700 mb-2`}>{description}</p>
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">預估投資：{investment}</span>
      <span className="text-green-600">年節水：{savings}</span>
    </div>
  </div>
)

// ChartLoadingState component to simulate data loading
const ChartLoadingState = () => (
  <div className="p-6 w-full">
    <div className="flex flex-col space-y-3">
      <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3"></div>
      <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2"></div>
      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-12 gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div 
              key={i} 
              className="h-24 md:h-40 bg-gray-200 rounded animate-pulse"
              style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: "1.5s"
              }}
            ></div>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
        </div>
      </div>
    </div>
  </div>
)

export default function CompanyPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [previousTab, setPreviousTab] = useState("")

  // Handle tab switching with loading state simulation
  const handleTabChange = useCallback((tabId) => {
    // Save previous tab for animation direction
    setPreviousTab(activeTab)
    // Simulate loading state when switching tabs
    setIsLoading(true)
    setActiveTab(tabId)
    
    // Simulate data fetching delay
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [activeTab])

  // Initial loading simulation on page load
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const handleSignOut = useCallback(() => {
    router.push("/")
  }, [router])

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev)
  }, [])

  // Navigation items for sidebar - extracted for maintainability
  const navItems = [
    { icon: Home, label: "儀表板", id: "dashboard" },
    { icon: BarChart3, label: "用水報告", id: "reports" },
    { icon: FileUp, label: "上傳數據", id: "upload" },
    { icon: Settings, label: "設定", id: "settings" },
  ]

  // Animation variants for tab transitions
  const tabVariants = {
    hidden: (custom) => ({
      opacity: 0,
      x: custom === "right" ? 20 : -20,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: (custom) => ({
      opacity: 0,
      x: custom === "right" ? -20 : 20,
      transition: {
        duration: 0.2
      }
    })
  }

  // Determine animation direction based on tab index
  const getAnimationDirection = () => {
    const currentIndex = navItems.findIndex(item => item.id === activeTab);
    const previousIndex = navItems.findIndex(item => item.id === previousTab);
    return currentIndex > previousIndex ? "right" : "left";
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-teal-500 text-white shadow-md">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6" />
            <h1 className="text-xl font-bold">WaterWise 企業版</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:inline">台灣積體電路製造股份有限公司 (TSMC)</span>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-teal-600">
              <LogOut className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden text-white hover:bg-teal-600">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-64px)] relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          fixed md:sticky md:top-16 md:self-start 
          top-0 bottom-0 left-0 
          w-64 bg-white border-r border-gray-200
          transform transition-transform duration-200 ease-in-out z-30
          md:h-[calc(100vh-64px)]
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          max-h-screen overflow-y-auto
        `}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <Droplet className="h-6 w-6 text-teal-500" />
                <h2 className="text-lg font-semibold">WaterWise 企業版</h2>
              </div>
              <div className="md:hidden flex justify-between items-center">
                <span className="text-sm text-gray-500">功能選單</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleSidebar} 
                  className="h-8 w-8"
                  aria-label="關閉選單"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18"></path>
                    <path d="M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-1">
                {navItems.map((item) => (
                  <SidebarNavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    active={activeTab === item.id}
                    onClick={() => handleTabChange(item.id)}
                  />
                ))}
              </div>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-5 w-5" />
                登出
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden max-w-full relative">
          <motion.div
            key={activeTab}
            custom={getAnimationDirection()}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={tabVariants}
            className="w-full"
          >
          {activeTab === "dashboard" && (
            <>
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">企業用水儀表板</h2>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                  <span className="text-gray-500">本月總用水：</span>
                  <span className="text-lg md:text-xl font-bold text-blue-600">290,000,000L</span>
                  <span className="hidden md:inline text-gray-500">|</span>
                  <span className="text-gray-500">產品線數量：</span>
                  <span className="text-lg md:text-xl font-bold">5 條</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                <UsageMetricCard
                  title="本月用水量"
                  description="與上月相比"
                  value="58,900L"
                  changeValue="5.2%"
                  changeDirection="up"
                />

                <UsageMetricCard
                  title="平均單位用水"
                  description="每產品用水量"
                  value="10.8L"
                  changeValue="2.1%"
                  changeDirection="down"
                />

                <UsageMetricCard
                  title="水資源效率"
                  description="產出/用水比率"
                  value="97%"
                  changeValue="3.5%"
                  changeDirection="up"
                />
              </div>

                {/* Water Usage Chart Component with Loading State */}
              <div className="w-full overflow-hidden">
                  <Card className="mb-6">
                    {isLoading ? (
                      <ChartLoadingState />
                    ) : (
                      <WaterUsageChart />
                    )}
                  </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <CardTitle className="text-lg">產品線用水摘要</CardTitle>
                        <CardDescription>本月各產品線用水量</CardDescription>
                      </div>
                      <Select defaultValue="month">
                        <SelectTrigger className="w-full md:w-36">
                          <SelectValue placeholder="選擇時間" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="week">本週</SelectItem>
                          <SelectItem value="month">本月</SelectItem>
                          <SelectItem value="quarter">本季</SelectItem>
                          <SelectItem value="year">本年</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardHeader>
                  <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="animate-pulse">
                              <div className="flex justify-between mb-1">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                              </div>
                              <div className="h-2 bg-gray-100 rounded-full overflow-hidden w-full">
                                <div className="h-full bg-gray-200 rounded-full" style={{ width: `${100 - i * 15}%` }}></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                    <div className="space-y-4">
                      <ProductLineItem 
                        name="晶圓製造 A" 
                        volume="120,000,000L" 
                        change="↓5%" 
                        width="80%" 
                        quantity="5,000瓶" 
                        unitMeasure="0.62L/瓶" 
                      />
                      
                      <ProductLineItem 
                        name="封裝測試 B" 
                        volume="85,000,000L" 
                        change="↑8%" 
                        width="48%" 
                        quantity="1,000件" 
                        unitMeasure="28L/件" 
                      />
                      
                      <ProductLineItem 
                        name="記憶體 C" 
                        volume="45,000,000L" 
                        change="↓2%" 
                        width="21%" 
                        quantity="8,000瓶" 
                        unitMeasure="1.56L/瓶" 
                      />
                      
                      <ProductLineItem 
                        name="邏輯晶片 D" 
                        volume="25,000,000L" 
                        change="↑3%" 
                        width="17%" 
                        quantity="200台" 
                        unitMeasure="49L/台" 
                      />
                      
                      <ProductLineItem 
                        name="類比晶片 E" 
                        volume="15,000,000L" 
                        change="↓7%" 
                        width="9%" 
                        quantity="300台" 
                        unitMeasure="34L/台" 
                      />
                    </div>
                      )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">用水優化建議</CardTitle>
                    <CardDescription>根據您的用水情況分析出的節水方案</CardDescription>
                  </CardHeader>
                  <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          {[1, 2, 3].map(i => (
                            <div key={i} className="p-4 border border-gray-100 rounded-md animate-pulse">
                              <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                              <div className="flex justify-between mt-3">
                                <div className="h-3 bg-gray-200 rounded w-28"></div>
                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                              </div>
                            </div>
                          ))}
                          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      ) : (
                    <div className="space-y-4">
                      <OptimizationSuggestion 
                        color="blue"
                        title="製程用水回收系統升級"
                        description="晶圓製造 A 線的用水量佔比最高，建議升級該線的用水回收系統，可提升回收率達 15%。"
                        investment="NT$2,800,000"
                        savings="18,000,000L"
                      />

                      <OptimizationSuggestion 
                        color="green"
                        title="冷卻水塔效率最佳化"
                        description="目前冷卻水塔效率低於業界標準，建議調整循環參數與更換高效率填充材。"
                        investment="NT$850,000"
                        savings="7,500,000L"
                      />

                      <OptimizationSuggestion 
                        color="amber"
                        title="製程參數優化"
                        description="封裝測試 B 線的溫度控制系統耗水量過高，微調參數可節省用水。"
                        investment="NT$50,000"
                        savings="3,200,000L"
                      />

                      <Button className="w-full">查看完整節水報告</Button>
                    </div>
                      )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">用水報告</h2>
                <p className="text-gray-500">查看詳細的用水數據分析及趨勢報告</p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">歷年用水量比較</CardTitle>
                  <CardDescription>企業年度用水趨勢分析</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full bg-gray-50 border rounded-md">
                        <div className="animate-pulse flex flex-col items-center">
                          <BarChart3 className="h-12 w-12 text-gray-300" />
                          <div className="h-4 bg-gray-200 rounded w-32 mt-4"></div>
                          <div className="h-3 bg-gray-200 rounded w-48 mt-2"></div>
                        </div>
                      </div>
                    ) : (
                  <div className="flex items-center justify-center h-full bg-gray-50 border rounded-md">
                    <p className="text-gray-500">年度趨勢圖表將顯示在這裡</p>
                  </div>
                    )}
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">環境影響評估</CardTitle>
                    <CardDescription>用水減量對環境的積極影響</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-green-100 bg-green-50 rounded-md">
                      <h4 className="text-green-700 font-medium mb-2">碳排放減少</h4>
                      <p className="text-sm text-green-700">您的節水措施每年減少約 124 噸碳排放</p>
                    </div>
                    <div className="p-4 border border-blue-100 bg-blue-50 rounded-md">
                      <h4 className="text-blue-700 font-medium mb-2">水資源保育</h4>
                      <p className="text-sm text-blue-700">您的節水措施相當於保護了 5.2 公頃的自然水域</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">節水成效報告</CardTitle>
                    <CardDescription>歷年節水措施成效分析</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>2023 年節水成效</span>
                      <span className="font-medium text-green-600">28,000,000 L</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span>2022 年節水成效</span>
                      <span className="font-medium text-green-600">21,500,000 L</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4">
                      <span>2021 年節水成效</span>
                      <span className="font-medium text-green-600">14,800,000 L</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === "upload" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">上傳數據</h2>
                <p className="text-gray-500">上傳您的用水資料以獲得分析報告</p>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">數據上傳</CardTitle>
                  <CardDescription>支援 CSV、Excel 格式檔案</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <FileUp className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">將檔案拖放到此處或點擊上傳</p>
                      <Button className="mt-2">選擇檔案</Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    <h4 className="font-medium mb-1">注意事項：</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>檔案大小不得超過 10MB</li>
                      <li>數據必須包含日期、用水量及產品數量欄位</li>
                      <li>請確保上傳數據的格式正確</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">歷史上傳記錄</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">2023年8月用水數據.xlsx</p>
                        <p className="text-sm text-gray-500">上傳於: 2023/09/05 14:30</p>
                      </div>
                      <Button variant="ghost" size="sm">下載</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">2023年7月用水數據.xlsx</p>
                        <p className="text-sm text-gray-500">上傳於: 2023/08/03 09:15</p>
                      </div>
                      <Button variant="ghost" size="sm">下載</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                      <div>
                        <p className="font-medium">2023年6月用水數據.xlsx</p>
                        <p className="text-sm text-gray-500">上傳於: 2023/07/02 11:45</p>
                      </div>
                      <Button variant="ghost" size="sm">下載</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-xl md:text-2xl font-bold mb-2">帳戶設定</h2>
                <p className="text-gray-500">管理您的企業帳戶資訊及偏好設定</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">企業資訊</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">企業名稱</label>
                      <input 
                        type="text" 
                        defaultValue="台灣積體電路製造股份有限公司 (TSMC)" 
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">產業別</label>
                      <Select defaultValue="semiconductor">
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue placeholder="選擇產業" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="semiconductor">半導體製造</SelectItem>
                          <SelectItem value="electronics">電子產品製造</SelectItem>
                          <SelectItem value="biotech">生物科技</SelectItem>
                          <SelectItem value="food">食品製造</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">聯絡電子郵件</label>
                      <input 
                        type="email" 
                        defaultValue="waterconservation@tsmc.com" 
                        className="w-full p-2 mt-1 border border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <Button className="w-full mt-2">儲存變更</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">報表偏好設定</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>每週用水報告</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>節水提醒通知</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>異常用水警示</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
                      </label>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">用水目標設定</label>
                      <div className="flex items-center mt-1">
                        <input 
                          type="number" 
                          defaultValue="450000" 
                          className="w-full p-2 border border-gray-300 rounded-l-md"
                        />
                        <span className="bg-gray-100 p-2 border border-l-0 border-gray-300 rounded-r-md text-gray-500">
                          升/月
                        </span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-2">儲存偏好設定</Button>
                  </CardContent>
                </Card>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Global Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-white bg-opacity-70 z-50 pointer-events-none flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-3 h-3 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
