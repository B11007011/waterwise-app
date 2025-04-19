"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, Info, XCircle, X } from "lucide-react"
import { Button } from "./button"

export type NotificationVariant = "info" | "success" | "warning" | "error"

export interface NotificationProps {
  id: string
  title: string
  message?: string
  variant?: NotificationVariant
  duration?: number
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: "default" | "outline" | "ghost"
  }>
  onClose?: () => void
}

interface NotificationComponentProps extends NotificationProps {
  onRemove: (id: string) => void
}

const NotificationIcons = {
  info: <Info className="h-5 w-5 text-blue-500" />,
  success: <CheckCircle2 className="h-5 w-5 text-green-500" />,
  warning: <AlertCircle className="h-5 w-5 text-amber-500" />,
  error: <XCircle className="h-5 w-5 text-red-500" />,
}

const variantStyles: Record<NotificationVariant, string> = {
  info: "border-blue-100 bg-blue-50",
  success: "border-green-100 bg-green-50",
  warning: "border-amber-100 bg-amber-50", 
  error: "border-red-100 bg-red-50",
}

function NotificationComponent({
  id,
  title,
  message,
  variant = "info",
  duration = 5000,
  actions,
  onRemove,
  onClose,
}: NotificationComponentProps) {
  const [isVisible, setIsVisible] = useState(true)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const handleRemove = () => {
    setIsVisible(false)
    if (onClose) onClose()
    setTimeout(() => onRemove(id), 300) // Allow exit animation to finish
  }

  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(handleRemove, duration)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [duration, id])

  const pauseTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }

  const resumeTimer = () => {
    if (duration > 0) {
      timerRef.current = setTimeout(handleRemove, duration)
    }
  }

  return (
    <div
      className={cn(
        "max-w-sm w-full border rounded-lg shadow-lg pointer-events-auto overflow-hidden transition-all duration-300 ease-in-out",
        variantStyles[variant],
        isVisible ? "opacity-100 transform translate-y-0" : "opacity-0 transform translate-y-2"
      )}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <div className="relative p-4 pr-8">
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">關閉</span>
        </button>

        <div className="flex items-start">
          <div className="flex-shrink-0">{NotificationIcons[variant]}</div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            {message && <p className="mt-1 text-sm text-gray-500">{message}</p>}
            
            {actions && actions.length > 0 && (
              <div className="mt-3 flex gap-3">
                {actions.map((action, index) => (
                  <Button
                    key={index}
                    size="sm"
                    variant={action.variant || "default"}
                    onClick={() => {
                      action.onClick()
                      handleRemove()
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

type NotificationContextType = {
  notifications: NotificationProps[]
  addNotification: (notification: Omit<NotificationProps, "id">) => string
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  addListener: (callback: (notifications: NotificationProps[]) => void) => () => void
}

export const createNotificationContext = (): NotificationContextType => {
  let notifications: NotificationProps[] = []
  let listeners: Function[] = []

  const notifyListeners = () => {
    listeners.forEach(listener => listener([...notifications]))
  }

  return {
    get notifications() {
      return [...notifications]
    },
    addNotification: (notification) => {
      const id = `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      notifications.push({ ...notification, id })
      notifyListeners()
      return id
    },
    removeNotification: (id) => {
      notifications = notifications.filter(n => n.id !== id)
      notifyListeners()
    },
    clearAllNotifications: () => {
      notifications = []
      notifyListeners()
    },
    addListener: (callback) => {
      listeners.push(callback)
      return () => {
        const idx = listeners.indexOf(callback)
        if (idx !== -1) listeners.splice(idx, 1)
      }
    }
  }
}

// Create a singleton instance of the notification context
export const globalNotifications = createNotificationContext()

export function NotificationContainer() {
  const [notifications, setNotifications] = useState<NotificationProps[]>([])
  const [isMounted, setIsMounted] = useState(false)
  
  // Save the container in a ref to avoid layout thrashing
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
    
    const updateNotifications = (currentNotifications: NotificationProps[]) => {
      setNotifications([...currentNotifications])
    }
    
    // Subscribe to notification changes
    const unsubscribe = globalNotifications.addListener(updateNotifications)
    
    return () => {
      unsubscribe()
    }
  }, [])

  // Create container element if it doesn't exist
  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div')
      containerRef.current.className = 'fixed top-4 right-4 z-50 flex flex-col gap-4'
      document.body.appendChild(containerRef.current)
    }
    
    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current)
      }
    }
  }, [])

  if (!isMounted || !containerRef.current) return null

  return createPortal(
    <>
      {notifications.map((notification) => (
        <NotificationComponent
          key={notification.id}
          {...notification}
          onRemove={globalNotifications.removeNotification}
        />
      ))}
    </>,
    containerRef.current
  )
}

// Convenience methods
export const notify = {
  info: (title: string, message?: string, options?: Partial<Omit<NotificationProps, 'id' | 'title' | 'message' | 'variant'>>) => 
    globalNotifications.addNotification({ title, message, variant: 'info', ...options }),
  
  success: (title: string, message?: string, options?: Partial<Omit<NotificationProps, 'id' | 'title' | 'message' | 'variant'>>) => 
    globalNotifications.addNotification({ title, message, variant: 'success', ...options }),
  
  warning: (title: string, message?: string, options?: Partial<Omit<NotificationProps, 'id' | 'title' | 'message' | 'variant'>>) => 
    globalNotifications.addNotification({ title, message, variant: 'warning', ...options }),
  
  error: (title: string, message?: string, options?: Partial<Omit<NotificationProps, 'id' | 'title' | 'message' | 'variant'>>) => 
    globalNotifications.addNotification({ title, message, variant: 'error', ...options }),
} 