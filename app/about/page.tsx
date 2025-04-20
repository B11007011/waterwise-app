import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, FileText, Info, Users } from "lucide-react"

export default function AboutPage() {
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

        <div className="grid gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-teal-500" />
                <CardTitle>關於 WaterWise</CardTitle>
              </div>
              <CardDescription>台灣水足跡積分系統介紹</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                WaterWise
                水足跡積分系統是台灣首創的水資源管理平台，旨在透過數位化追蹤與獎勵機制，促進全民節水意識，並提供企業與政府有效管理水資源的工具。
              </p>
              <p className="mb-4">
                根據台灣經濟部水利署資料，2011年至2019年間，台灣平均每年缺水量達5.306億立方公尺，且因全球氣候變遷，未來情況將更加嚴峻。WaterWise
                系統透過整合消費者、企業與政府三方數據，建立完整的水資源使用生態系統，為台灣的永續水資源管理提供創新解決方案。
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="background" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="background">背景資訊</TabsTrigger>
              <TabsTrigger value="technology">技術介紹</TabsTrigger>
              <TabsTrigger value="goals">目標與願景</TabsTrigger>
            </TabsList>
            <TabsContent value="background">
              <Card>
                <CardHeader>
                  <CardTitle>台灣水資源現況</CardTitle>
                  <CardDescription>面臨的挑戰與機遇</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    台灣位於亞熱帶地區，年平均降雨量約2,542毫米，為全球平均值的2.6倍。然而，台灣河川短促湍急，加上全球氣候變遷與自然災害如乾旱和豪雨的影響，導致豐水年與枯水年的頻率從過去的數十年縮短至僅數年。
                  </p>
                  <p>
                    自2002年台灣史上最乾旱的一年以來，台灣已經歷了2011年、2014年、2018年、2019年和2020年等多個乾旱年份。2021年台灣更遭遇了被形容為「百年一遇」的嚴重乾旱。
                  </p>
                  <p>
                    截至2020年，台灣水利署報告現有水庫淤積率達23%，有效容量減少至19.84億立方公尺。此外，尋找新水庫的合適位置面臨環境考量和公眾對大型工程的質疑等挑戰。
                  </p>
                  <p>
                    為應對嚴重的水資源短缺，台灣政府積極推動再生水利用，目標在2031年達到每日132萬立方公尺的再生水供應量，其中77萬立方公尺來自市政污水處理廠，45萬立方公尺來自高耗水產業，5萬立方公尺來自工業園區污水處理廠，5萬立方公尺來自家庭用水消費者。
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="technology">
              <Card>
                <CardHeader>
                  <CardTitle>再生水技術</CardTitle>
                  <CardDescription>台灣再生水處理技術與應用</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    再生水處理技術通常包含四個主要階段：預處理、脫鹽、拋光和回收。預處理是初始階段，類似於傳統的廢水處理過程，主要目的是去除懸浮固體並降低污染物水平。第二階段涉及將大部分溶解離子與水分離。拋光階段進一步提高處理水的質量。最後，越來越多的產業採用回收廠內使用過的水的做法。
                  </p>
                  <p>
                    高科技產業如半導體、顯示器製造業使用的超純水系統，需要整合所有四個階段的水處理。常用的處理單元包括：
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">預處理技術：</span>{" "}
                      混凝沉澱、多媒體過濾、活性碳過濾、離子交換、紫外線氧化、微濾/超濾、膜生物反應器(MBR)
                    </li>
                    <li>
                      <span className="font-medium">脫鹽技術：</span> 反滲透(RO)、電去離子、電透析反轉(EDR)、電容去離子
                    </li>
                    <li>
                      <span className="font-medium">拋光技術：</span>{" "}
                      超濾、高級氧化處理(AOP)如H₂O₂、臭氧化、紫外線輻射、脫氣
                    </li>
                    <li>
                      <span className="font-medium">回收技術：</span> 電凝結、活性碳處理、高級氧化處理
                    </li>
                  </ul>
                  <p>
                    台灣高科技產業如群創光電、友達光電和日月光等公司已實施全面的水回收系統，回收率分別達到97.2%、94.5%和80%，每年總回收水量分別為2.9億立方公尺、1.38億立方公尺和350萬立方公尺。
                  </p>
                  <p>
                    市政污水再生水方面，鳳山再生水廠每日處理4萬立方公尺再生水供應中國鋼鐵公司使用，運營維護成本為每立方公尺11.5新台幣；永康再生水廠每日處理1.55萬立方公尺再生水供應半導體和TFT-LCD製造業，運營維護成本為每立方公尺25.8新台幣。
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="goals">
              <Card>
                <CardHeader>
                  <CardTitle>WaterWise 目標與願景</CardTitle>
                  <CardDescription>建立永續水資源管理生態系統</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    WaterWise
                    水足跡積分系統的核心目標是建立一個整合消費者、企業和政府的水資源管理平台，透過數據驅動和獎勵機制，促進全民節水意識並提高水資源使用效率。
                  </p>
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">短期目標 (1-2年)</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>建立消費者水足跡追蹤系統，連結發票資訊與產品水足跡數據</li>
                      <li>發展企業用水監測與分析工具，協助企業提高水資源使用效率</li>
                      <li>建立政府水資源管理平台，整合全國用水數據與分析</li>
                      <li>推動水足跡積分兌換機制，提供實質節水獎勵</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">中期目標 (3-5年)</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>擴大系統覆蓋範圍，納入更多產品類別與企業</li>
                      <li>深化AI分析功能，提供更精準的節水建議與預測</li>
                      <li>建立跨部門水資源交換平台，促進再生水利用</li>
                      <li>推動水足跡標籤制度，提高消費者選購意識</li>
                    </ul>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-medium text-lg">長期願景 (5-10年)</h3>
                    <ul className="list-disc pl-6 space-y-1">
                      <li>建立完整的水資源循環經濟體系</li>
                      <li>達成2031年每日132萬立方公尺再生水供應目標</li>
                      <li>提高全國工業用水回收率至75%以上</li>
                      <li>發展國際水足跡標準與認證，提升台灣產品國際競爭力</li>
                      <li>建立亞洲領先的水資源管理示範區</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-teal-500" />
                  <CardTitle>團隊成員</CardTitle>
                </div>
                <CardDescription>WaterWise 開發與研究團隊</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* <div>
                    <h3 className="font-medium">研究團隊</h3>
                    <ul className="mt-2 space-y-1">
                      <li>鄭海軒 - 國立成功大學環境工程學系</li>
                      <li>余萬盛 - 內政部營建署</li>
                      <li>曾書莊 - 內政部營建署</li>
                      <li>吳怡儒 - 國立成功大學環境工程學系</li>
                      <li>謝慶麟 - 日月光半導體股份有限公司</li>
                      <li>林世軒 - 康科技股份有限公司</li>
                      <li>朱慶平 - 中興工程顧問社環境工程研究中心</li>
                      <li>黃裕德 - 中興工程顧問社環境工程研究中心</li>
                      <li>陳婉茹 - 國立成功大學永續環境研究中心</li>
                      <li>林財富 - 國立成功大學永續環境研究中心</li>
                      <li>王良銘 - 國立成功大學永續環境研究中心</li>
                    </ul>
                  </div> */}
                  <div>
                    <h3 className="font-medium">系統開發團隊</h3>
                    <ul className="mt-2 space-y-1">
                      <li>Tecxmate.com</li>
                      <li>政策研究 - 賈昕 (Shin)</li>
                      <li>解決方案 - 賈昕 (Shin), Nikolas Doan (段皇方）</li>
                      <li>數據分析 - Edgar Effendi (洪豪進）</li>
                      <li>系統設計 - Nikolas Doan (段皇方）</li>
                      <li>原型設計 - Nikolas Doan (段皇方）</li>
                      <li>介面設計 - Nikolas Doan (段皇方）</li>
                      <li>簡報設計 - Nikolas Doan (段皇方）</li>
                      <li>系統架構 - Brian Nguyen (阮文貴）</li>
                      <li>前端開發 - Brian Nguyen (阮文貴）</li>
                      <li>後端開發 - Brian Nguyen (阮文貴）</li>
                      <li>App 開發 - Brian Nguyen (阮文貴）</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-teal-500" />
                  <CardTitle>相關資源</CardTitle>
                </div>
                <CardDescription>研究報告與參考資料</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">研究報告</h3>
                    <ul className="mt-2 space-y-2">
                      <li>
                        <a href="#" className="text-teal-600 hover:underline flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          鄭海軒等 (2023) 台灣再生水：現況與未來展望
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-teal-600 hover:underline flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          經濟部水利署 (2020) 水資源統計年報
                        </a>
                      </li>
                      <li>
                        <a href="#" className="text-teal-600 hover:underline flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          內政部營建署 (2020) 市政污水處理廠再生水推動計畫
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium">相關連結</h3>
                    <ul className="mt-2 space-y-2">
                      <li>
                        <a
                          href="https://www.wra.gov.tw/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          經濟部水利署
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.cpami.gov.tw/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          內政部營建署
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.moea.gov.tw/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-600 hover:underline flex items-center"
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          經濟部
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>聯絡我們</CardTitle>
              <CardDescription>有任何問題或建議，歡迎與我們聯繫</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-2">聯絡資訊</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-medium w-20">聯絡人：</span>
                      <span>Brian Nguyen (阮文貴）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">電話：</span>
                      <span>0900-299-506</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">電子郵件：</span>
                      <span>brian.tecx@gmail.com</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">聯絡人：</span>
                      <span>Nikolas Doan (段皇方）</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">電話：</span>
                      <span>0966-392-602</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">電子郵件：</span>
                      <span>niko.tecx@gmail.com</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium w-20">服務時間：</span>
                      <span>週一至週五 9:00-17:00</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium mb-2">意見回饋</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    我們重視您的意見，請填寫以下表單或直接寄送電子郵件與我們聯繫。
                  </p>
                  <Button className="w-full">填寫意見回饋表單</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
