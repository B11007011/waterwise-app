"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-500">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-2">
            <Droplet className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white">WaterWise</h1>
              <h1 className="text-xl sm:text-2xl font-bold text-white">水足跡積分系統</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/about" className="w-full sm:w-auto">
              <Button variant="outline" className="bg-white hover:bg-gray-100 w-full sm:w-auto">
                關於我們
              </Button>
            </Link>
            <Link href="/faq" className="w-full sm:w-auto">
              <Button variant="outline" className="bg-white hover:bg-gray-100 w-full sm:w-auto">
                常見問題
              </Button>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
          <Link href="/consumer" className="no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">消費者介面</CardTitle>
                <CardDescription>追蹤您的消費水足跡，獲取環保獎勵</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Droplet className="h-16 sm:h-24 w-16 sm:w-24 text-cyan-500" />
                </div>
                <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base">查看您的水足跡積分，掃描發票並兌換水費折扣</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-sm sm:text-base">進入消費者介面</Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/company" className="no-underline">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">企業介面</CardTitle>
                <CardDescription>監控產品製造用水量，提升水資源效率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Droplet className="h-16 sm:h-24 w-16 sm:w-24 text-blue-500" />
                </div>
                <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base">分析產品線用水趨勢，比較月度用水量變化</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-sm sm:text-base">進入企業介面</Button>
              </CardFooter>
            </Card>
          </Link>

          <Link href="/government" className="no-underline sm:col-span-2 lg:col-span-1">
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">政府介面</CardTitle>
                <CardDescription>監測全國水資源使用情況，分析產業用水</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Droplet className="h-16 sm:h-24 w-16 sm:w-24 text-teal-500" />
                </div>
                <p className="mt-3 sm:mt-4 text-center text-sm sm:text-base">查看企業用水數據，分析產品類別平均用水量</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-sm sm:text-base">進入政府介面</Button>
              </CardFooter>
            </Card>
          </Link>
        </div>

        <div className="mt-10 sm:mt-16 text-center text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-4">水足跡積分系統如何運作?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-cyan-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-cyan-600 text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">1</div>
              <h3 className="text-base sm:text-lg font-medium mb-2">消費者購買節水產品</h3>
              <p className="text-xs sm:text-sm text-white/80">選購有水足跡標章的產品，掃描發票累積積分</p>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-cyan-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-cyan-600 text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">2</div>
              <h3 className="text-base sm:text-lg font-medium mb-2">企業優化生產流程</h3>
              <p className="text-xs sm:text-sm text-white/80">製造商監控並減少生產過程中的水資源使用</p>
            </div>
            <div className="bg-white/10 p-4 sm:p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-cyan-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-cyan-600 text-lg sm:text-xl font-bold mx-auto mb-3 sm:mb-4">3</div>
              <h3 className="text-base sm:text-lg font-medium mb-2">獲得實質獎勵</h3>
              <p className="text-xs sm:text-sm text-white/80">消費者可折抵水費，企業獲得減稅與補助</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
