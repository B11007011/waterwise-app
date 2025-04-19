"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Loading } from "@/components/ui/loading"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [activeTab, setActiveTab] = useState("sign-in")
  const [selectedRole, setSelectedRole] = useState<"consumer" | "company" | "government">("consumer")
  
  const { signIn, signUp, isLoading } = useAuth()
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) return
    
    const success = await signIn(email, password)
    
    if (!success) {
      // Error notification is handled in the auth context
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password || !name) return
    
    const success = await signUp(email, password, name, selectedRole)
    
    if (!success) {
      // Error notification is handled in the auth context
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white">
            <Droplet className="h-8 w-8" />
            <span className="text-2xl font-bold">WaterWise</span>
          </Link>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Tabs defaultValue="sign-in" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sign-in">登入</TabsTrigger>
                  <TabsTrigger value="sign-up">註冊</TabsTrigger>
                </TabsList>
              
                <div className="mt-4">
                  <CardTitle className="text-center">{activeTab === "sign-in" ? "登入帳號" : "建立新帳號"}</CardTitle>
                  <CardDescription className="text-center">
                    {activeTab === "sign-in" 
                      ? "輸入您的帳號密碼以登入系統" 
                      : "註冊一個新帳號開始使用水足跡積分系統"}
                  </CardDescription>
                </div>
              
                <TabsContent value="sign-in">
                  <form onSubmit={handleSignIn}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">電子信箱</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">密碼</Label>
                          <Link href="#" className="text-xs text-blue-500 hover:underline">
                            忘記密碼?
                          </Link>
                        </div>
                        <Input 
                          id="password" 
                          type="password" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <p>示範帳號:</p>
                        <p>消費者: consumer@example.com</p>
                        <p>企業: company@example.com</p>
                        <p>政府: government@example.com</p>
                        <p>密碼: 任意</p>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loading size="small" className="mr-2" />
                            登入中...
                          </>
                        ) : "登入"}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
                
                <TabsContent value="sign-up">
                  <form onSubmit={handleSignUp}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">姓名或單位名稱</Label>
                        <Input 
                          id="name" 
                          placeholder="輸入您的姓名或單位名稱" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">電子信箱</Label>
                        <Input 
                          id="email-signup" 
                          type="email" 
                          placeholder="your@email.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-signup">密碼</Label>
                        <Input 
                          id="password-signup" 
                          type="password" 
                          placeholder="至少8個字元" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={8}
                          disabled={isLoading}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>帳號類型</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            type="button"
                            variant={selectedRole === "consumer" ? "default" : "outline"}
                            onClick={() => setSelectedRole("consumer")}
                            disabled={isLoading}
                            className={selectedRole === "consumer" ? "border-2 border-blue-500" : ""}
                          >
                            消費者
                          </Button>
                          <Button 
                            type="button"
                            variant={selectedRole === "company" ? "default" : "outline"}
                            onClick={() => setSelectedRole("company")}
                            disabled={isLoading}
                            className={selectedRole === "company" ? "border-2 border-blue-500" : ""}
                          >
                            企業
                          </Button>
                          <Button 
                            type="button"
                            variant={selectedRole === "government" ? "default" : "outline"}
                            onClick={() => setSelectedRole("government")}
                            disabled={isLoading}
                            className={selectedRole === "government" ? "border-2 border-blue-500" : ""}
                          >
                            政府單位
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loading size="small" className="mr-2" />
                            註冊中...
                          </>
                        ) : "註冊帳號"}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </CardHeader>
        </Card>
        
        <div className="mt-6 text-center">
          <Link href="/" className="text-white hover:underline">
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  )
}
