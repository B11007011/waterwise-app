"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, Barcode, Bell, Droplet, Home, LogOut, Search, Settings, Check, X } from "lucide-react"
import QRScanner from "./qr-scanner"

export default function ConsumerPage() {
  const router = useRouter()
  const [showWaterCreditSuccess, setShowWaterCreditSuccess] = useState(false)
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [lastScannedData, setLastScannedData] = useState<string | null>(null)
  const [showScannedSuccess, setShowScannedSuccess] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleWaterCreditClick = () => {
    setShowWaterCreditSuccess(true)
  }

  const handleSignOut = () => {
    router.push("/")
  }

  const handleScanSuccess = (data: string) => {
    setLastScannedData(data)
    setShowQRScanner(false)
    setShowScannedSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowScannedSuccess(false)
    }, 3000)
  }

  const handleSearchClick = () => {
    // Toggle search modal visibility
    setShowSearch(prev => !prev);
    // Close other modals if open
    if (!showSearch) {
      setShowQRScanner(false);
      setShowSettings(false);
    }
  }

  const handleSettingsClick = () => {
    // Toggle settings modal visibility
    setShowSettings(prev => !prev);
    // Close other modals if open
    if (!showSettings) {
      setShowQRScanner(false);
      setShowSearch(false);
    }
  }

  // Function to handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Function to close all modals
  const closeAllModals = () => {
    setShowSearch(false)
    setShowSettings(false)
    setShowQRScanner(false)
    setShowWaterCreditSuccess(false)
  }

  // Function to handle home button click
  const handleHomeClick = () => {
    closeAllModals()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-500 text-white p-3 sm:p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 sm:h-6 sm:w-6" />
            <h1 className="text-lg sm:text-xl font-bold">WaterWise</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Bell className="h-5 w-5 cursor-pointer" />
            <Button variant="ghost" size="icon" onClick={handleSignOut} className="text-white hover:bg-teal-600">
              <LogOut className="h-5 w-5" />
            </Button>
            <div className="h-8 w-8 rounded-full bg-white/20">
              <div className="h-full w-full flex items-center justify-center text-xs font-medium">李</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Added pb-20 class to prevent content from being hidden under the navigation bar */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 pb-24">
        {showScannedSuccess && (
          <div className="mb-4 bg-green-100 border border-green-200 text-green-800 rounded-md p-3 sm:p-4 flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="font-medium">掃描成功!</p>
              <p className="text-sm text-green-600">已新增水足跡積分 +150L</p>
            </div>
          </div>
        )}

        <Card className="mb-4 sm:mb-6">
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-base sm:text-lg">載具積分總覽</CardTitle>
            <CardDescription>您的水足跡積分與發票紀錄</CardDescription>
          </CardHeader>
          <CardContent className="px-4">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                <div className="relative w-36 h-36 sm:w-48 sm:h-48 mb-4">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl sm:text-3xl font-bold text-teal-600">12,540L</span>
                      <span className="text-xs sm:text-sm text-gray-500">累積水足跡</span>
                    </div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e6e6e6" strokeWidth="5" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="5"
                      strokeDasharray="283"
                      strokeDashoffset="70"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="text-center mb-4">
                  <p className="text-xs sm:text-sm text-gray-500">可折抵水費</p>
                  <p className="text-lg sm:text-xl font-bold">NT$125</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleWaterCreditClick} className="bg-teal-500 hover:bg-teal-600 text-xs sm:text-sm py-2">
                    WaterCredit 折抵水費
                  </Button>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <h3 className="font-medium mb-3 text-sm sm:text-base">最近發票</h3>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { id: 1, number: "AB-1234567", date: "2023/10/11", items: [
                      { name: "有機蔬菜", value: 120 },
                      { name: "環保洗衣精", value: 85 },
                      { name: "再生紙巾", value: 45 }
                    ], total: 250 },
                    { id: 2, number: "AB-7654321", date: "2023/10/12", items: [
                      { name: "有機蔬菜", value: 120 },
                      { name: "環保洗衣精", value: 85 },
                      { name: "再生紙巾", value: 45 }
                    ], total: 250 },
                    { id: 3, number: "AB-9876543", date: "2023/10/13", items: [
                      { name: "有機蔬菜", value: 120 },
                      { name: "環保洗衣精", value: 85 },
                      { name: "再生紙巾", value: 45 }
                    ], total: 250 }
                  ].map((invoice) => (
                    <Card key={invoice.id} className="overflow-hidden">
                      <CardContent className="p-2 sm:p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-sm sm:text-base">發票號碼: {invoice.number}</p>
                            <p className="text-xs sm:text-sm text-gray-500">{invoice.date}</p>
                            <div className="mt-1 sm:mt-2 space-y-0.5 sm:space-y-1">
                              {invoice.items.map((item, index) => (
                                <p key={index} className="text-xs sm:text-sm">
                                  {item.name} <span className="text-teal-600">+{item.value}L</span>
                                </p>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-teal-600 text-sm sm:text-base">+{invoice.total}L</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-3 sm:mt-4 text-center">
                  <Button variant="outline" className="text-teal-600 text-xs sm:text-sm py-1.5">
                    查看更多發票 <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 pt-4 pb-2">
            <CardTitle className="text-base sm:text-lg">本月節水成果</CardTitle>
            <CardDescription>2023年10月</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs sm:text-sm text-gray-500">已節省水量</span>
                  <span className="text-xs sm:text-sm font-medium">1,530 公升</span>
                </div>
                <Progress value={62} className="h-2" />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">目標: 2,000 公升</span>
                  <span className="text-xs text-gray-500">62%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs sm:text-sm text-gray-500">累積點數</span>
                  <div className="flex items-center">
                    <span className="font-medium text-blue-600 text-xs sm:text-sm">153</span>
                    <span className="text-xs text-gray-500 ml-1">WaterPoints</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm py-1.5">
                  兌換獎勵
                </Button>
              </div>

              <div className="pt-3 sm:pt-4">
                <h3 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">水足跡使用趨勢</h3>
                <div className="h-36 sm:h-48 bg-gray-100 rounded-md flex items-center justify-center">
                  <div className="w-full h-full p-4">
                    <div className="relative h-full">
                      {/* Simple chart representation */}
                      <div className="absolute bottom-0 left-0 w-full h-full flex items-end">
                        <div className="w-1/6 h-[60%] bg-teal-300 mx-1 rounded-t-sm"></div>
                        <div className="w-1/6 h-[75%] bg-teal-400 mx-1 rounded-t-sm"></div>
                        <div className="w-1/6 h-[65%] bg-teal-500 mx-1 rounded-t-sm"></div>
                        <div className="w-1/6 h-[80%] bg-teal-400 mx-1 rounded-t-sm"></div>
                        <div className="w-1/6 h-[70%] bg-teal-300 mx-1 rounded-t-sm"></div>
                        <div className="w-1/6 h-[55%] bg-teal-500 mx-1 rounded-t-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5月</span>
                  <span>6月</span>
                  <span>7月</span>
                  <span>8月</span>
                  <span>9月</span>
                  <span>10月</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation - Added shadow and z-index to ensure it's above content */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-1.5 sm:py-2 shadow-md z-10">
        <div className="container mx-auto flex justify-around">
          <button className="flex flex-col items-center p-1.5 sm:p-2 text-teal-600" onClick={handleHomeClick}>
            <Home className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">首頁</span>
          </button>
          <button className="flex flex-col items-center p-1.5 sm:p-2 text-gray-500" onClick={() => setShowQRScanner(true)}>
            <Barcode className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">掃描發票</span>
          </button>
          <button 
            className={`flex flex-col items-center p-1.5 sm:p-2 ${showSearch ? 'text-teal-600' : 'text-gray-500'}`} 
            onClick={handleSearchClick}
            aria-label="Open search"
          >
            <Search className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">查詢</span>
          </button>
          <button 
            className={`flex flex-col items-center p-1.5 sm:p-2 ${showSettings ? 'text-teal-600' : 'text-gray-500'}`} 
            onClick={handleSettingsClick}
            aria-label="Open settings"
          >
            <Settings className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">設定</span>
          </button>
        </div>
      </div>

      {/* Water Credit Success Modal */}
      {showWaterCreditSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-[90%] max-w-md">
            <CardHeader className="bg-teal-500 text-white py-3 px-4">
              <CardTitle className="text-center text-base sm:text-lg">台灣自來水公司</CardTitle>
              <CardDescription className="text-white text-center text-xs sm:text-sm">TAIWAN WATER CORPORATION</CardDescription>
            </CardHeader>
            <CardContent className="pt-5 sm:pt-6 pb-3 sm:pb-4 px-4">
              <div className="flex justify-center mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                </div>
              </div>
              <p className="text-center text-base sm:text-lg font-medium mb-2">成功將水足跡折抵應繳水費！</p>
              <p className="text-center text-xs sm:text-sm text-gray-500">您已使用 10,000L 水足跡積分折抵 NT$100 水費</p>
            </CardContent>
            <div className="p-4 flex justify-center">
              <Button onClick={() => setShowWaterCreditSuccess(false)} className="w-full max-w-xs">
                關閉
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* QR Scanner Modal */}
      {showQRScanner && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50">
          <div className="w-full max-w-md p-3 sm:p-4">
            <div className="mb-3 sm:mb-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-white">掃描發票 QR 碼</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowQRScanner(false)}
                className="text-white hover:bg-gray-800"
              >
                <span className="sr-only">關閉</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
            </div>
            <div className="bg-white rounded-lg overflow-hidden">
              <QRScanner onScan={handleScanSuccess} />
            </div>
            <p className="text-white text-center mt-3 sm:mt-4 text-xs sm:text-sm">請將發票 QR 碼對準掃描框</p>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-start z-50 pt-16 overflow-y-auto">
          <div className="w-full max-w-md p-3 sm:p-4">
            <div className="mb-3 sm:mb-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-white">水足跡積分查詢</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSearch(false)}
                className="text-white hover:bg-gray-800"
              >
                <span className="sr-only">關閉</span>
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden p-4">
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="輸入產品名稱或發票號碼..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
              </div>
              
              {searchTerm ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">搜尋結果：</p>
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">有機蔬菜</p>
                          <p className="text-xs text-gray-500">平均水足跡：120L / 公斤</p>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          查看詳情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-sm">環保洗衣精</p>
                          <p className="text-xs text-gray-500">平均水足跡：85L / 瓶</p>
                        </div>
                        <Button size="sm" variant="outline" className="text-xs">
                          查看詳情
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500">輸入關鍵字開始搜尋</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-start z-50 pt-16 overflow-y-auto">
          <div className="w-full max-w-md p-3 sm:p-4">
            <div className="mb-3 sm:mb-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold text-white">設定</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
                className="text-white hover:bg-gray-800"
              >
                <span className="sr-only">關閉</span>
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              </Button>
            </div>
            
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="divide-y">
                <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 7v4"></path><path d="M5 7v4"></path>
                        </svg>
                      </div>
                      <span>個人資料設置</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
                          <line x1="2" x2="22" y1="10" y2="10"></line>
                        </svg>
                      </div>
                      <span>載具設定</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </div>
                      <span>應用設定</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                        <LogOut className="h-4 w-4" />
                      </div>
                      <span>登出</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
