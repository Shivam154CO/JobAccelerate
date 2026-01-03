"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookmarkPlus, ArrowUpRight, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface JobCardProps {
  title?: string
  company?: string
  location?: string
  salary?: string
  matchScore?: number
  tags?: string[]
  posted?: string
  onClick?: () => void
  onSave?: () => void
  loading?: boolean
  error?: boolean
}

// Helper function to clamp matchScore between 0 and 100
const clampMatchScore = (score: number): number => {
  if (typeof score !== 'number' || isNaN(score)) return 0
  return Math.min(100, Math.max(0, Math.round(score)))
}

// Fallback/default values
const DEFAULT_TAGS: string[] = []

export function JobCard({ 
  title = "Untitled Position", 
  company = "Unknown Company", 
  location = "Remote", 
  salary, 
  matchScore = 0, 
  tags = DEFAULT_TAGS, 
  posted = "Recently", 
  onClick,
  onSave,
  loading = false,
  error = false
}: JobCardProps) {
  const [isClient, setIsClient] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Show error state
  if (error) {
    return (
      <Card className="p-6 border-destructive/50 bg-destructive/10">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-lg text-destructive">Failed to load job</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Unable to display job information. Please try again.
            </p>
          </div>
        </div>
      </Card>
    )
  }

  // Show loading state
  if (loading) {
    return (
      <Card className="p-6 animate-pulse border-border/20">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
            <div className="h-8 w-8 bg-muted rounded-full"></div>
          </div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded w-16"></div>
            <div className="h-6 bg-muted rounded w-20"></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-20"></div>
              <div className="h-2 bg-muted rounded w-24"></div>
            </div>
            <div className="h-8 bg-muted rounded w-20"></div>
          </div>
        </div>
      </Card>
    )
  }

  // Validate and process data
  const safeMatchScore = clampMatchScore(matchScore)
  const displayMatchScore = isClient ? safeMatchScore : 0
  const matchScoreWidth = isClient ? `${safeMatchScore}%` : "0%"
  
  // Process tags safely
  const displayTags = Array.isArray(tags) 
    ? tags.filter(tag => typeof tag === 'string').slice(0, 5)
    : DEFAULT_TAGS

  const hasMoreTags = Array.isArray(tags) && tags.length > 5

  // Handle save click
  const handleSaveClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onSave) {
      setIsSaving(true)
      try {
        await onSave()
      } catch (err) {
        console.error("Failed to save job:", err)
      } finally {
        setIsSaving(false)
      }
    }
  }

  // Handle card click
  const handleCardClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Card 
      className={cn(
        "p-6 glassmorphic border-border/20 hover:shadow-smooth hover:-translate-y-1 transition-all group cursor-pointer",
        onClick && "hover:border-primary/50"
      )}
      onClick={handleCardClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick(e as any)
        }
      } : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 
            className="font-bold text-lg group-hover:text-primary transition truncate"
            title={title}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground truncate" title={`${company} • ${location}`}>
            {company} • {location}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="flex-shrink-0 hover:bg-primary/10"
          aria-label={`Save ${title} at ${company}`}
          onClick={handleSaveClick}
          disabled={isSaving}
        >
          <BookmarkPlus className={cn("w-5 h-5", isSaving && "animate-pulse")} />
        </Button>
      </div>

      {salary && (
        <p className="text-sm font-semibold text-accent mb-3 truncate" title={salary}>
          {salary}
        </p>
      )}

      {displayTags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4 min-h-[24px]">
          {displayTags.map((tag, index) => (
            <Badge 
              key={`${tag}-${index}`} 
              variant="secondary" 
              className="text-xs truncate max-w-[120px] hover:bg-secondary/80 transition"
              title={tag}
            >
              {tag}
            </Badge>
          ))}
          {hasMoreTags && (
            <Badge variant="outline" className="text-xs hover:bg-accent">
              +{tags.length - 5} more
            </Badge>
          )}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Match Score</p>
          <div className="flex items-center gap-2">
            <div 
              className="w-24 h-2 bg-muted rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={safeMatchScore}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${safeMatchScore}% match`}
            >
              <div
                className={cn(
                  "h-full bg-gradient-to-r from-primary to-accent transition-all duration-500",
                  safeMatchScore === 0 && "hidden"
                )}
                style={{ width: matchScoreWidth }}
              />
            </div>
            <span className="text-sm font-bold min-w-[36px] tabular-nums">
              {displayMatchScore}%
            </span>
          </div>
        </div>
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90 transition-all"
          asChild
        >
          <a 
            href="#apply"
            className="flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation()
              console.log(`Applying to ${title} at ${company}`)
            }}
          >
            Apply <ArrowUpRight className="w-3 h-3" />
          </a>
        </Button>
      </div>

      {posted && (
        <p className="text-xs text-muted-foreground mt-3">
          Posted {posted}
        </p>
      )}
    </Card>
  )
}

// Loading skeleton component
export function JobCardSkeleton() {
  return (
    <Card className="p-6 animate-pulse border-border/20">
      <div className="space-y-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
          <div className="h-8 w-8 bg-muted rounded-full"></div>
        </div>
        <div className="h-4 bg-muted rounded w-1/3"></div>
        <div className="flex gap-2">
          <div className="h-6 bg-muted rounded w-16"></div>
          <div className="h-6 bg-muted rounded w-20"></div>
          <div className="h-6 bg-muted rounded w-24"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-3 bg-muted rounded w-20"></div>
            <div className="h-2 bg-muted rounded w-24"></div>
          </div>
          <div className="h-8 bg-muted rounded w-20"></div>
        </div>
      </div>
    </Card>
  )
}