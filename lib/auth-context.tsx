"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { notify } from "@/components/ui/notification-system"

// Define the user types
export type UserRole = "consumer" | "company" | "government" | null

export interface UserProfile {
  id: string
  name: string
  email: string
  role: UserRole
  imageUrl?: string
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: UserProfile | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<boolean>
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Sample user data - in a real app, this would come from a database
const SAMPLE_USERS: UserProfile[] = [
  {
    id: "1",
    name: "李小明",
    email: "consumer@example.com",
    role: "consumer",
    imageUrl: "/avatars/consumer.png"
  },
  {
    id: "2",
    name: "台灣積體電路製造股份有限公司",
    email: "company@example.com",
    role: "company",
    imageUrl: "/avatars/company.png"
  },
  {
    id: "3",
    name: "水資源管理局",
    email: "government@example.com",
    role: "government",
    imageUrl: "/avatars/government.png"
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for saved session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would be a call to an API endpoint
        const savedSession = localStorage.getItem("waterwise_session")
        
        if (savedSession) {
          const parsedSession = JSON.parse(savedSession)
          const user = SAMPLE_USERS.find(u => u.id === parsedSession.userId)
          
          if (user) {
            setUser(user)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    try {
      // In a real app, this would be a call to an API endpoint
      // For demo purposes, we're just checking against our sample data
      const foundUser = SAMPLE_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
      
      if (foundUser) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800))
        
        // Save to local storage (in a real app, this would be a secure HTTP-only cookie)
        localStorage.setItem("waterwise_session", JSON.stringify({
          userId: foundUser.id,
          expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
        }))
        
        setUser(foundUser)
        notify.success("登入成功", "歡迎回來，" + foundUser.name)
        
        // Redirect based on role
        if (foundUser.role) {
          router.push(`/${foundUser.role}`)
        }
        
        return true
      } else {
        notify.error("登入失敗", "Email 或密碼錯誤")
        return false
      }
    } catch (error) {
      console.error("Sign in failed:", error)
      notify.error("登入失敗", "請稍後再試")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out function
  const signOut = () => {
    localStorage.removeItem("waterwise_session")
    setUser(null)
    router.push("/")
    notify.info("已登出", "您已成功登出系統")
  }

  // Sign up function
  const signUp = async (email: string, password: string, name: string, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    try {
      // In a real app, this would create a new user in the database
      // For demo purposes, we're just simulating success
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create a fake user ID
      const newUserId = `${Date.now()}`
      
      // Create the new user object
      const newUser: UserProfile = {
        id: newUserId,
        name,
        email,
        role
      }
      
      // Save to local storage
      localStorage.setItem("waterwise_session", JSON.stringify({
        userId: newUserId,
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
      }))
      
      setUser(newUser)
      notify.success("註冊成功", "歡迎使用 WaterWise")
      
      // Redirect based on role
      if (role) {
        router.push(`/${role}`)
      }
      
      return true
    } catch (error) {
      console.error("Sign up failed:", error)
      notify.error("註冊失敗", "請稍後再試")
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value = {
    isAuthenticated: !!user,
    isLoading,
    user,
    signIn,
    signOut,
    signUp
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  
  return context
} 