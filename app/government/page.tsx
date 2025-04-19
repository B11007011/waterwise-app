"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Droplet, Filter, LogOut, Menu } from "lucide-react"
import { IndustryPieChart } from "./components/IndustryPieChart"
import { RegionBarChart } from "./components/RegionBarChart"
import { ProductCategoryChart } from "./components/ProductCategoryChart"
import { CompanyTrendChart } from "./components/CompanyTrendChart"
import { PolicySimulationChart } from "./components/PolicySimulationChart"
import { EfficiencyTrendChart } from "./components/EfficiencyTrendChart"

export default function GovernmentPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSignOut = () => {
    router.push("/")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-700 text-white">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6" />
            <h1 className="text-xl font-bold">WaterWise 政府版</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline">水資源管理局</span>
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-teal-800">
              <LogOut className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="sm:hidden text-white hover:bg-teal-800"
            >
              <Menu className="h-5 w-5 cursor-pointer" />
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="sm:hidden bg-teal-800 py-2 px-4">
            <nav className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                className="justify-start text-white hover:bg-teal-600"
                onClick={() => {
                  setActiveTab("overview");
                  setMobileMenuOpen(false);
                }}
              >
                全國概覽
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-white hover:bg-teal-600"
                onClick={() => {
                  setActiveTab("categories");
                  setMobileMenuOpen(false);
                }}
              >
                產品類別分析
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-white hover:bg-teal-600"
                onClick={() => {
                  setActiveTab("companies");
                  setMobileMenuOpen(false);
                }}
              >
                企業用水監測
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start text-white hover:bg-teal-600"
                onClick={() => {
                  setActiveTab("simulation");
                  setMobileMenuOpen(false);
                }}
              >
                政策模擬
              </Button>
            </nav>
          </div>
        )}
        
        <div className="bg-teal-800 hidden sm:block">
          <div className="container mx-auto py-2 overflow-x-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="bg-transparent h-9">
                <TabsTrigger
                  value="overview"
                  className="text-teal-200 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  onClick={() => setActiveTab("overview")}
                >
                  全國概覽
                </TabsTrigger>
                <TabsTrigger
                  value="categories"
                  className="text-teal-200 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  onClick={() => setActiveTab("categories")}
                >
                  產品類別分析
                </TabsTrigger>
                <TabsTrigger
                  value="companies"
                  className="text-teal-200 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  onClick={() => setActiveTab("companies")}
                >
                  企業用水監測
                </TabsTrigger>
                <TabsTrigger
                  value="simulation"
                  className="text-teal-200 data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                  onClick={() => setActiveTab("simulation")}
                >
                  政策模擬
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {activeTab === "overview" && (
          <>
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">全國水資源使用概覽</h2>
              <p className="text-gray-500">2023年10月資料</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">全國企業總用水量</CardTitle>
                  <CardDescription>本月總計</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,630,000,000 L</div>
                  <p className="text-sm text-gray-500 mt-1">
                    較上月 <span className="text-red-500">+2.3%</span>
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">登記企業數</CardTitle>
                  <CardDescription>按產業分類</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">1,320</div>
                  <p className="text-sm text-gray-500 mt-1">
                    較上月 <span className="text-green-500">+15</span> 家
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">平均用水效率</CardTitle>
                  <CardDescription>產出/用水比率</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">75%</div>
                  <p className="text-sm text-gray-500 mt-1">
                    較上月 <span className="text-green-500">+1.2%</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div>
                    <CardTitle className="text-lg">區域用水分佈</CardTitle>
                    <CardDescription>各地區企業用水量</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Select defaultValue="month">
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="選擇時間" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">本週</SelectItem>
                        <SelectItem value="month">本月</SelectItem>
                        <SelectItem value="quarter">本季</SelectItem>
                        <SelectItem value="year">本年</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="w-full h-[300px]">
                    <RegionBarChart />
                  </div>

                  <div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>台北市</span>
                          <span className="font-medium">2,150,000 L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>新北市</span>
                          <span className="font-medium">1,850,000 L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>桃園市</span>
                          <span className="font-medium">1,450,000 L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "50%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>台中市</span>
                          <span className="font-medium">1,250,000 L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>高雄市</span>
                          <span className="font-medium">1,100,000 L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "38%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>其他地區</span>
                          <span className="font-medium">950,000 L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "33%" }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-medium mb-2">台北市用水最高企業</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>台北電子股份有限公司</span>
                          <span>320,000 L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>北區紡織廠</span>
                          <span>280,000 L</span>
                        </div>
                        <div className="flex justify-between">
                          <span>台灣飲料公司</span>
                          <span>210,000 L</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">產業用水分佈</CardTitle>
                  <CardDescription>按產業類別分析</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px] mb-6">
                    <IndustryPieChart />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-teal-500 mr-2"></div>
                      <span className="flex-1">電子製造業</span>
                      <span className="font-medium">32%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="flex-1">紡織業</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="flex-1">食品飲料業</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                      <span className="flex-1">化學工業</span>
                      <span className="font-medium">15%</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="flex-1">其他產業</span>
                      <span className="font-medium">11%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">用水效率排名</CardTitle>
                  <CardDescription>最高效率企業</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">企業名稱</th>
                          <th className="text-left py-2 px-4">產業</th>
                          <th className="text-right py-2 px-4">用水量 (L)</th>
                          <th className="text-right py-2 px-4">效率</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="py-2 px-4">綠能科技</td>
                          <td className="py-2 px-4">電子</td>
                          <td className="text-right py-2 px-4">185,000</td>
                          <td className="text-right py-2 px-4 text-green-500">94%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">台灣環保紡織</td>
                          <td className="py-2 px-4">紡織</td>
                          <td className="text-right py-2 px-4">210,000</td>
                          <td className="text-right py-2 px-4 text-green-500">92%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">永續食品</td>
                          <td className="py-2 px-4">食品</td>
                          <td className="text-right py-2 px-4">150,000</td>
                          <td className="text-right py-2 px-4 text-green-500">91%</td>
                        </tr>
                        <tr className="border-b">
                          <td className="py-2 px-4">智慧家電</td>
                          <td className="py-2 px-4">電子</td>
                          <td className="text-right py-2 px-4">195,000</td>
                          <td className="text-right py-2 px-4 text-green-500">89%</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-4">生態化工</td>
                          <td className="py-2 px-4">化學</td>
                          <td className="text-right py-2 px-4">175,000</td>
                          <td className="text-right py-2 px-4 text-green-500">87%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "categories" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">產品類別用水分析</h2>
              <p className="text-gray-500">各類產品平均用水量</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input placeholder="搜尋產品類別..." className="w-full" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="month">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="選擇時間" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">本月</SelectItem>
                    <SelectItem value="quarter">本季</SelectItem>
                    <SelectItem value="year">本年</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="選擇產業" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部產業</SelectItem>
                    <SelectItem value="electronics">電子製造</SelectItem>
                    <SelectItem value="textile">紡織業</SelectItem>
                    <SelectItem value="food">食品飲料</SelectItem>
                    <SelectItem value="chemical">化學工業</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-3 px-4">產品類別</th>
                        <th className="text-right py-3 px-4">平均用水量/單位</th>
                        <th className="text-right py-3 px-4">企業數量</th>
                        <th className="text-right py-3 px-4">最高用水量</th>
                        <th className="text-right py-3 px-4">最低用水量</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">洗髮精</td>
                        <td className="text-right py-3 px-4">350L</td>
                        <td className="text-right py-3 px-4">78</td>
                        <td className="text-right py-3 px-4">11,000L (品牌X)</td>
                        <td className="text-right py-3 px-4">120L (品牌Y)</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">T恤</td>
                        <td className="text-right py-3 px-4">2,700L</td>
                        <td className="text-right py-3 px-4">34</td>
                        <td className="text-right py-3 px-4">52,000L (品牌Y)</td>
                        <td className="text-right py-3 px-4">950L (品牌Z)</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">筆記型電腦</td>
                        <td className="text-right py-3 px-4">9,800L</td>
                        <td className="text-right py-3 px-4">12</td>
                        <td className="text-right py-3 px-4">200,000L (品牌Z)</td>
                        <td className="text-right py-3 px-4">4,500L (品牌A)</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">寶特瓶</td>
                        <td className="text-right py-3 px-4">8L</td>
                        <td className="text-right py-3 px-4">23</td>
                        <td className="text-right py-3 px-4">15L (品牌B)</td>
                        <td className="text-right py-3 px-4">4L (品牌C)</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">智慧型手機</td>
                        <td className="text-right py-3 px-4">1,280L</td>
                        <td className="text-right py-3 px-4">8</td>
                        <td className="text-right py-3 px-4">3,500L (品牌D)</td>
                        <td className="text-right py-3 px-4">850L (品牌E)</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">牛仔褲</td>
                        <td className="text-right py-3 px-4">3,400L</td>
                        <td className="text-right py-3 px-4">19</td>
                        <td className="text-right py-3 px-4">7,800L (品牌F)</td>
                        <td className="text-right py-3 px-4">1,200L (品牌G)</td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">洗碗精</td>
                        <td className="text-right py-3 px-4">180L</td>
                        <td className="text-right py-3 px-4">42</td>
                        <td className="text-right py-3 px-4">450L (品牌H)</td>
                        <td className="text-right py-3 px-4">90L (品牌I)</td>
                      </tr>
                      <tr className="hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">洗衣機</td>
                        <td className="text-right py-3 px-4">5,200L</td>
                        <td className="text-right py-3 px-4">15</td>
                        <td className="text-right py-3 px-4">12,000L (品牌J)</td>
                        <td className="text-right py-3 px-4">2,800L (品牌K)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">產品類別用水比較</CardTitle>
                  <CardDescription>各類產品平均用水量</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <ProductCategoryChart />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">產品用水效率趨勢</CardTitle>
                  <CardDescription>過去12個月平均用水量變化</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="w-full h-[300px]">
                    <EfficiencyTrendChart />
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === "companies" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">企業用水監測</h2>
              <p className="text-gray-500">監控企業用水情況</p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input placeholder="搜尋企業名稱..." className="w-full" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="month">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="選擇時間" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">本月</SelectItem>
                    <SelectItem value="quarter">本季</SelectItem>
                    <SelectItem value="year">本年</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="選擇區域" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部區域</SelectItem>
                    <SelectItem value="taipei">台北市</SelectItem>
                    <SelectItem value="newtaipei">新北市</SelectItem>
                    <SelectItem value="taoyuan">桃園市</SelectItem>
                    <SelectItem value="taichung">台中市</SelectItem>
                    <SelectItem value="kaohsiung">高雄市</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Card className="mb-6">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left py-3 px-4">企業名稱</th>
                        <th className="text-left py-3 px-4">產業</th>
                        <th className="text-left py-3 px-4">區域</th>
                        <th className="text-right py-3 px-4">本月用水量</th>
                        <th className="text-right py-3 px-4">與上月比較</th>
                        <th className="text-right py-3 px-4">用水效率</th>
                        <th className="text-center py-3 px-4">詳情</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">台灣積體電路製造股份有限公司</td>
                        <td className="py-3 px-4">電子製造</td>
                        <td className="py-3 px-4">台北市</td>
                        <td className="text-right py-3 px-4">290,000,000L</td>
                        <td className="text-right py-3 px-4 text-red-500">+5.2%</td>
                        <td className="text-right py-3 px-4">97%</td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">友達光電股份有限公司</td>
                        <td className="py-3 px-4">紡織業</td>
                        <td className="py-3 px-4">新北市</td>
                        <td className="text-right py-3 px-4">138,000,000L</td>
                        <td className="text-right py-3 px-4 text-green-500">-2.1%</td>
                        <td className="text-right py-3 px-4">94.5%</td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">群創光電股份有限公司</td>
                        <td className="py-3 px-4">食品飲料</td>
                        <td className="py-3 px-4">台中市</td>
                        <td className="text-right py-3 px-4">120,000,000L</td>
                        <td className="text-right py-3 px-4 text-red-500">+1.8%</td>
                        <td className="text-right py-3 px-4">97.2%</td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">日月光半導體股份有限公司</td>
                        <td className="py-3 px-4">電子製造</td>
                        <td className="py-3 px-4">新竹市</td>
                        <td className="text-right py-3 px-4">3,500,000L</td>
                        <td className="text-right py-3 px-4 text-green-500">-3.5%</td>
                        <td className="text-right py-3 px-4">80%</td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50 cursor-pointer">
                        <td className="py-3 px-4">中國鋼鐵股份有限公司</td>
                        <td className="py-3 px-4">化學工業</td>
                        <td className="py-3 px-4">高雄市</td>
                        <td className="text-right py-3 px-4">45,000,000L</td>
                        <td className="text-right py-3 px-4 text-green-500">-1.2%</td>
                        <td className="text-right py-3 px-4">68.7%</td>
                        <td className="text-center py-3 px-4">
                          <Button variant="ghost" size="sm">
                            查看
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">企業用水詳情 - 台灣積體電路製造股份有限公司</CardTitle>
                <CardDescription>過去12個月用水趨勢</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="w-full h-[240px]">
                      <CompanyTrendChart />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">產品用水明細</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>晶圓製造 A系列</span>
                          <span className="font-medium">120,000L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "38%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>封裝測試 B系列</span>
                          <span className="font-medium">85,000L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "27%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>記憶體 C系列</span>
                          <span className="font-medium">65,000L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span>其他產品</span>
                          <span className="font-medium">50,000L</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {activeTab === "simulation" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">水資源政策模擬</h2>
              <p className="text-gray-500">模擬不同政策對水資源使用的影響</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">水資源稅率模擬</CardTitle>
                  <CardDescription>調整稅率以評估對用水量的影響</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">稅率等級</label>
                      <Select defaultValue="b">
                        <SelectTrigger>
                          <SelectValue placeholder="選擇稅率等級" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a">A級 (低稅率)</SelectItem>
                          <SelectItem value="b">B級 (中稅率)</SelectItem>
                          <SelectItem value="c">C級 (高稅率)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">獎勵機制</label>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="rebate" className="mr-2" />
                          <label htmlFor="rebate">節水回饋</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="cap" className="mr-2" />
                          <label htmlFor="cap">用水上限</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="progressive" className="mr-2" />
                          <label htmlFor="progressive">累進稅率</label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">產業適用範圍</label>
                      <Select defaultValue="all">
                        <SelectTrigger>
                          <SelectValue placeholder="選擇適用產業" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全部產業</SelectItem>
                          <SelectItem value="electronics">電子製造業</SelectItem>
                          <SelectItem value="textile">紡織業</SelectItem>
                          <SelectItem value="food">食品飲料業</SelectItem>
                          <SelectItem value="chemical">化學工業</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">執行模擬</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">模擬結果</CardTitle>
                  <CardDescription>預測政策實施後的影響</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">預計稅收</h4>
                      <div className="text-3xl font-bold">NT$530,600,000</div>
                      <p className="text-sm text-gray-500 mt-1">
                        較現行政策 <span className="text-green-500">+15%</span>
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">預計用水量變化</h4>
                      <div className="text-3xl font-bold text-red-500">-10.2%</div>
                      <p className="text-sm text-gray-500 mt-1">約減少 1,320,000 公升/日</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">建議資金分配</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span>再生水處理廠</span>
                            <span className="font-medium">NT$265,300,000</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 rounded-full" style={{ width: "50%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span>都市排水升級</span>
                            <span className="font-medium">NT$176,900,000</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 rounded-full" style={{ width: "33%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span>社區集水站建設</span>
                            <span className="font-medium">NT$88,400,000</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-teal-500 rounded-full" style={{ width: "17%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">長期影響預測</CardTitle>
                <CardDescription>政策實施後5年內的預測趨勢</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[300px] mb-4">
                  <PolicySimulationChart />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-md p-4">
                    <h4 className="font-medium text-green-800 mb-2">環境影響</h4>
                    <p className="text-sm text-green-600">
                      預計5年內可減少用水量12.5%，相當於每年節省5.3億公升水資源。
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <h4 className="font-medium text-blue-800 mb-2">經濟影響</h4>
                    <p className="text-sm text-blue-600">
                      預計企業將投入NT$7.7億於再生水技術，創造約1,200個相關就業機會。
                    </p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                    <h4 className="font-medium text-amber-800 mb-2">社會影響</h4>
                    <p className="text-sm text-amber-600">
                      預計可提高民眾節水意識，家庭用水量可望減少5%，約每戶每月節省300公升。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>

      {/* Add a floating sign out button for mobile */}
      <div className="md:hidden fixed bottom-4 right-4">
        <Button onClick={handleSignOut} className="rounded-full w-12 h-12 shadow-lg bg-teal-600 hover:bg-teal-700">
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
