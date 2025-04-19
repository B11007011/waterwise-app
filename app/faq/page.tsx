import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Droplet, HelpCircle } from "lucide-react"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-500">
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Droplet className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">WaterWise 水足跡積分系統</h1>
          </div>
          <Link href="/">
            <Button variant="outline" className="bg-white hover:bg-gray-100">
              返回首頁
            </Button>
          </Link>
        </header>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-teal-500" />
              <CardTitle>常見問題</CardTitle>
            </div>
            <CardDescription>關於 WaterWise 水足跡積分系統的常見問題解答</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>什麼是水足跡積分系統？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    水足跡積分系統是一個追蹤和管理水資源使用的創新平台，連結消費者、企業和政府三方數據，建立完整的水資源使用生態系統。
                  </p>
                  <p>
                    對消費者而言，系統會根據您購買的產品計算水足跡積分，並提供水費折抵等獎勵；對企業而言，系統提供用水監測與分析工具，協助提高水資源使用效率；對政府而言，系統整合全國用水數據，提供政策制定參考。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>如何累積水足跡積分？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">消費者可以透過以下方式累積水足跡積分：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>購買具有水足跡標籤的環保產品，並掃描發票</li>
                    <li>參與節水挑戰活動</li>
                    <li>分享節水成果至社群媒體</li>
                    <li>參與水資源教育活動</li>
                    <li>推薦親友加入水足跡積分系統</li>
                  </ul>
                  <p className="mt-2">
                    積分計算方式：每節省1公升水資源可獲得1點水足跡積分，每100點積分可折抵新台幣1元水費。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>如何兌換水足跡積分？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">水足跡積分可以透過以下方式兌換：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>水費折抵：直接在APP中申請，折抵下期水費</li>
                    <li>環保商品：在合作商家兌換環保商品</li>
                    <li>公共交通點數：轉換為公共交通點數</li>
                    <li>慈善捐贈：將積分轉為對水資源保育計畫的捐款</li>
                  </ul>
                  <p className="mt-2">兌換流程：登入APP → 點選「積分兌換」→ 選擇兌換項目 → 確認兌換 → 完成</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>企業如何參與水足跡積分系統？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">企業可以透過以下方式參與水足跡積分系統：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>申請產品水足跡認證，讓產品納入積分計算</li>
                    <li>導入企業用水監測系統，提高水資源使用效率</li>
                    <li>參與再生水交換計畫</li>
                    <li>成為積分兌換合作商家</li>
                    <li>贊助水資源保育計畫</li>
                  </ul>
                  <p className="mt-2">
                    企業參與可獲得的好處：提升品牌形象、降低用水成本、符合ESG永續發展目標、獲得政府節水獎勵。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>什麼是再生水？如何應用於日常生活？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">
                    再生水是指經過處理的廢水，可再次使用於非飲用目的。根據台灣《再生水資源發展條例》，再生水主要來源包括高耗水產業廢水和市政污水處理廠。
                  </p>
                  <p className="mb-2">再生水在日常生活中的應用：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>工業用水：冷卻、鍋爐、製程用水</li>
                    <li>都市雜用水：景觀澆灌、道路清洗、消防用水</li>
                    <li>生態補水：河川、濕地生態系統維護</li>
                    <li>農業灌溉：特定農作物灌溉（需符合水質標準）</li>
                  </ul>
                  <p className="mt-2">
                    台灣目標在2031年達到每日132萬立方公尺的再生水供應量，其中77萬立方公尺來自市政污水處理廠，45萬立方公尺來自高耗水產業。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>台灣面臨哪些水資源挑戰？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">台灣面臨的主要水資源挑戰包括：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>氣候變遷導致降雨不均：豐水年與枯水年頻率縮短</li>
                    <li>水庫淤積問題：截至2020年，台灣水庫淤積率達23%</li>
                    <li>水資源需求增加：工業發展與人口增長導致用水需求上升</li>
                    <li>水資源分配不均：區域間水資源分配不平衡</li>
                    <li>新水源開發困難：環境考量和公眾對大型工程的質疑</li>
                  </ul>
                  <p className="mt-2">
                    根據台灣經濟部水利署資料，2011年至2019年間，台灣平均每年缺水量達5.306億立方公尺，且預計未來情況將更加嚴峻。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger>如何查詢產品的水足跡數據？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">查詢產品水足跡數據的方法：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>掃描產品上的水足跡QR碼</li>
                    <li>在WaterWise APP中搜尋產品名稱或條碼</li>
                    <li>瀏覽WaterWise官方網站的產品資料庫</li>
                    <li>查看產品包裝上的水足跡標籤</li>
                  </ul>
                  <p className="mt-2">
                    目前系統已收錄超過10,000種常見消費品的水足跡數據，包括食品、飲料、服飾、電子產品、家居用品等類別。如果找不到特定產品的水足跡數據，可以向我們提交產品資訊，我們將進行評估並更新資料庫。
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8">
                <AccordionTrigger>系統如何保護用戶隱私？</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">WaterWise系統採取以下措施保護用戶隱私：</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>資料加密：所有個人資料和交易記錄均採用高級加密技術保護</li>
                    <li>匿名化處理：分析用數據經過匿名化處理，無法識別個人身份</li>
                    <li>權限管理：嚴格的系統權限管理，確保資料只能被授權人員訪問</li>
                    <li>定期安全審計：系統定期進行安全審計和漏洞掃描</li>
                    <li>透明的隱私政策：清晰說明數據收集、使用和保護方式</li>
                  </ul>
                  <p className="mt-2">
                    用戶可以隨時在APP的「隱私設置」中查看和管理自己的數據，包括查看數據使用記錄、調整數據分享範圍、下載個人數據副本或申請刪除帳戶。
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <div className="bg-white rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-4">還有其他問題？</h2>
          <p className="mb-6">如果您有其他問題或需要更多協助，請聯繫我們的客服團隊</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-teal-500 hover:bg-teal-600">聯絡客服</Button>
            <Link href="/about">
              <Button variant="outline">了解更多</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
