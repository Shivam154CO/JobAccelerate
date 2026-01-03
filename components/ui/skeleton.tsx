"use client"

import { cn } from "@/lib/utils"

export function Skeleton({ 
  className 
}: { 
  className?: string 
}) {
  return (
    <div 
      className={cn("animate-pulse rounded-md bg-muted", className)}
      suppressHydrationWarning
    />
  )
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-4" suppressHydrationWarning>
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" suppressHydrationWarning>
      <Skeleton className="h-10 w-64" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  )
}

// Add this new component for the sparkles effect
export function SparklesSkeleton() {
  return (
    <div className="absolute inset-0" suppressHydrationWarning>
      {/* Static sparkle positions that won't cause hydration mismatch */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute inline-block bg-black dark:bg-white"
          style={{
            top: `${(i * 8) % 100}%`,
            left: `${(i * 7) % 100}%`,
            width: "2px",
            height: "2px",
            borderRadius: "50%",
            zIndex: 1,
          }}
        />
      ))}
    </div>
  )
}