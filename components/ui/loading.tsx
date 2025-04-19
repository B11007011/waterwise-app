import React from "react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  /**
   * Optional text to display below the spinner
   */
  text?: string;
  
  /**
   * The size of the spinner (small, medium, large)
   * @default "medium"
   */
  size?: "small" | "medium" | "large";
  
  /**
   * Whether to center the spinner on the page
   * @default false
   */
  fullScreen?: boolean;
  
  /**
   * Additional className to apply to the spinner container
   */
  className?: string;
  
  /**
   * Color of the spinner (primary, secondary, or any Tailwind color)
   * @default "primary"
   */
  color?: "primary" | "secondary" | string;
}

export function Loading({
  text,
  size = "medium",
  fullScreen = false,
  className,
  color = "primary",
}: LoadingProps) {
  // Map size to actual dimensions
  const sizeMap = {
    small: "w-4 h-4 border-2",
    medium: "w-8 h-8 border-3",
    large: "w-12 h-12 border-4",
  }
  
  // Map color to Tailwind classes
  const colorMap: Record<string, string> = {
    primary: "border-t-blue-600",
    secondary: "border-t-teal-500",
    blue: "border-t-blue-600",
    teal: "border-t-teal-500",
    green: "border-t-green-500",
    red: "border-t-red-500",
    amber: "border-t-amber-500",
    purple: "border-t-purple-500",
  }
  
  // Get the actual color class, defaulting to primary if not found
  const colorClass = colorMap[color] || colorMap.primary
  
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center",
        fullScreen && "fixed inset-0 bg-white/80 backdrop-blur-sm z-50",
        className
      )}
    >
      <div
        className={cn(
          "rounded-full animate-spin border-gray-300",
          sizeMap[size],
          colorClass
        )}
      />
      {text && (
        <p className={cn(
          "mt-4 text-gray-600",
          size === "small" && "text-xs",
          size === "large" && "text-lg font-medium"
        )}>
          {text}
        </p>
      )}
    </div>
  )
}

/**
 * A fullscreen loading overlay with a static message
 */
export function FullscreenLoading({ message = "載入中..." }: { message?: string }) {
  return (
    <Loading
      text={message}
      size="large"
      fullScreen
      color="primary"
    />
  )
}

/**
 * A loading skeleton for content that's still loading
 */
export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-200", className)} />
  )
} 