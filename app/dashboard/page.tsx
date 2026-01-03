"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardActivity } from "@/components/dashboard-activity"
import { AnalyticsChart } from "@/components/analytics-chart"
import { JobCard } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, RefreshCw } from "lucide-react"
import { useState, useEffect, Suspense } from "react"

// Skeleton components for loading state
function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader />
      <main className="ml-20 md:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="h-32 bg-muted rounded-lg animate-pulse"
                suppressHydrationWarning
              />
            ))}
          </div>

          {/* Main Content Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Chart Skeleton */}
              <div 
                className="h-80 bg-muted rounded-lg animate-pulse"
                suppressHydrationWarning
              />
              
              {/* Jobs Skeleton */}
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className="h-32 bg-muted rounded-lg animate-pulse"
                    suppressHydrationWarning
                  />
                ))}
              </div>
            </div>
            
            {/* Right Column Skeleton */}
            <div className="space-y-6">
              <div 
                className="h-64 bg-muted rounded-lg animate-pulse"
                suppressHydrationWarning
              />
              <div 
                className="h-48 bg-muted rounded-lg animate-pulse"
                suppressHydrationWarning
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Error display component
function DashboardError({ error, onRetry }: { error: string, onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader />
      <main className="ml-20 md:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
            <div className="flex items-center gap-3 text-destructive mb-4">
              <AlertCircle className="h-6 w-6" />
              <h3 className="text-lg font-semibold">Failed to load dashboard</h3>
            </div>
            <p className="text-sm mb-6">{error}</p>
            <div className="flex gap-3">
              <Button
                onClick={onRetry}
                className="bg-primary hover:bg-primary/90"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Go to Homepage</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data for now
      setDashboardData({
        stats: [
          { label: "Applications Sent", value: "128", change: "+12%" },
          { label: "Interviews", value: "18", change: "+5%" },
          { label: "Avg. Response Time", value: "2.4 days", change: "-0.5" },
          { label: "Success Rate", value: "14%", change: "+2%" }
        ]
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  // Show skeleton during initial load or if not on client yet
  if (loading || !isClient) return <DashboardSkeleton />
  if (error) return <DashboardError error={error} onRetry={fetchDashboardData} />

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader />

      <main className="ml-20 md:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <DashboardStats />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left Column: Analytics & Jobs */}
            <div className="lg:col-span-2 space-y-6">
              {/* Chart - Wrap in Suspense to handle loading */}
              <Suspense fallback={
                <div className="h-80 bg-muted rounded-lg animate-pulse" />
              }>
                <AnalyticsChart />
              </Suspense>

              {/* Jobs Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Recommended Jobs</h2>
                  <Button variant="outline" size="sm" asChild>
                    <a href="/dashboard/jobs">View All</a>
                  </Button>
                </div>

                <div className="space-y-4">
                  <JobCard
                    title="Senior Product Manager"
                    company="Stripe"
                    location="San Francisco, CA"
                    salary="$180K - $250K"
                    matchScore={94}
                    tags={["Remote", "Management", "B2B SaaS"]}
                    posted="2 hours ago"
                  />
                  <JobCard
                    title="Full Stack Engineer"
                    company="Vercel"
                    location="Remote"
                    salary="$150K - $200K"
                    matchScore={87}
                    tags={["Remote", "React", "Node.js"]}
                    posted="4 hours ago"
                  />
                  <JobCard
                    title="Design System Lead"
                    company="Figma"
                    location="San Francisco, CA"
                    salary="$160K - $220K"
                    matchScore={79}
                    tags={["Design", "Leadership", "UI/UX"]}
                    posted="6 hours ago"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Activity & Status */}
            <div className="space-y-6">
              <Suspense fallback={
                <div className="h-64 bg-muted rounded-lg animate-pulse" />
              }>
                <DashboardActivity />
              </Suspense>

              {/* Quick Stats */}
              <Card className="p-6 glassmorphic border-border/20">
                <h2 className="font-bold mb-4">Current Plan</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Plan</p>
                    <Badge className="bg-primary/20 text-primary">Pro Plan</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Daily Applications Left</p>
                    <p className="text-2xl font-bold">18 / 50</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Emails Remaining</p>
                    <p className="text-2xl font-bold">163 / 500</p>
                  </div>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90" asChild>
                    <a href="/dashboard/billing">Upgrade Plan</a>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}