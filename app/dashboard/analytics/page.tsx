"use client"

import { ErrorBoundary } from "@/components/error-boundary"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsChart } from "@/components/analytics-chart"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { RefreshCw, AlertCircle, TrendingUp, Users, Target, BarChart as BarChartIcon } from "lucide-react"
import { useState, useEffect } from "react"

// Mock API function (replace with actual API call)
const fetchAnalyticsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
  
  // Simulate random errors (10% chance)
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch analytics data. Please try again.")
  }
  
  return {
    conversionData: [
      { stage: "Applications", value: 389 },
      { stage: "Replies", value: 45 },
      { stage: "Interviews", value: 12 },
      { stage: "Offers", value: 2 },
    ],
    cvPerformance: [
      { name: "CV v1", applications: 145, replies: 18, interviews: 4 },
      { name: "CV v2", applications: 89, replies: 14, interviews: 5 },
      { name: "CV v3", applications: 155, replies: 13, interviews: 3 },
    ],
    jobSourceData: [
      { name: "LinkedIn", value: 145 },
      { name: "Indeed", value: 89 },
      { name: "Wellfound", value: 75 },
      { name: "Glassdoor", value: 80 },
    ],
    metrics: [
      { label: "Total Applications", value: "389", change: "+42%" },
      { label: "Email Open Rate", value: "34%", change: "+12%" },
      { label: "Reply Rate", value: "11.5%", change: "+3%" },
      { label: "Interview Rate", value: "3.1%", change: "+1.2%" },
    ],
    stats: [
      { label: "Applications", value: "128", change: "+12%", icon: TrendingUp },
      { label: "Interviews", value: "18", change: "+5%", icon: Users },
      { label: "Success Rate", value: "14%", change: "+2%", icon: Target },
      { label: "Avg. Response", value: "2.4 days", change: "-0.5", icon: BarChartIcon },
    ]
  }
}

// Error display component
function AnalyticsError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
      <div className="flex items-center gap-3 text-destructive mb-4">
        <AlertCircle className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Failed to load analytics</h3>
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
        <Button variant="outline" onClick={() => window.location.reload()}>
          Refresh Page
        </Button>
      </div>
    </div>
  )
}

// Loading skeleton component
function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>

      {/* Metrics skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 border border-border/20 rounded-lg">
            <div className="h-4 w-32 bg-muted animate-pulse rounded mb-2" />
            <div className="flex items-end justify-between">
              <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              <div className="h-6 w-16 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-6 border border-border/20 rounded-lg">
          <div className="h-6 w-48 bg-muted animate-pulse rounded mb-6" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
        <div className="p-6 border border-border/20 rounded-lg">
          <div className="h-6 w-48 bg-muted animate-pulse rounded mb-6" />
          <div className="h-64 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Table skeleton */}
      <div className="p-6 border border-border/20 rounded-lg">
        <div className="h-6 w-48 bg-muted animate-pulse rounded mb-6" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Button component
function Button({ children, onClick, className, variant = 'default', disabled = false }: any) {
  const baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-4 py-2"
  const variantClasses = variant === 'outline' 
    ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    : "bg-primary text-primary-foreground hover:bg-primary/90"
  
  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

// Analytics Content Component
function AnalyticsContent() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState("7d")
  const [data, setData] = useState<any>(null)

  const COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-accent)", "var(--color-chart-4)"]

  useEffect(() => {
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      setError(null)
      const analyticsData = await fetchAnalyticsData()
      setData(analyticsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      console.error("Failed to load analytics:", err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <AnalyticsSkeleton />
  }

  if (error) {
    return <AnalyticsError error={error} onRetry={loadAnalyticsData} />
  }

  if (!data) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader />

      <main className="ml-20 md:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Analytics</h1>
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                {["7d", "30d", "90d"].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    disabled={loading}
                  >
                    {range}
                  </Button>
                ))}
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={loadAnalyticsData}
                disabled={loading}
                className="h-8"
              >
                <RefreshCw className={`h-3 w-3 mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {data.metrics.map((metric: any, i: number) => (
              <Card key={i} className="p-4 glassmorphic border-border/20">
                <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <Badge className="text-accent-foreground bg-accent/20 text-accent">{metric.change}</Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Conversion Funnel */}
            <Card className="p-6 glassmorphic border-border/20">
              <h2 className="text-lg font-bold mb-6">Conversion Funnel</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data.conversionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="stage" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Job Sources */}
            <Card className="p-6 glassmorphic border-border/20">
              <h2 className="text-lg font-bold mb-6">Applications by Source</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data.jobSourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.jobSourceData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Weekly Trend */}
          <Card className="p-6 glassmorphic border-border/20 mb-6">
            <h2 className="text-lg font-bold mb-6">Weekly Performance</h2>
            <AnalyticsChart />
          </Card>

          {/* CV Performance */}
          <Card className="p-6 glassmorphic border-border/20">
            <h2 className="text-lg font-bold mb-6">CV Performance Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-border/20">
                  <tr>
                    <th className="text-left py-3 px-4">CV Version</th>
                    <th className="text-left py-3 px-4">Applications</th>
                    <th className="text-left py-3 px-4">Replies</th>
                    <th className="text-left py-3 px-4">Interviews</th>
                    <th className="text-left py-3 px-4">Reply Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.cvPerformance.map((row: any, i: number) => (
                    <tr key={i} className="border-b border-border/10 hover:bg-muted/20 transition">
                      <td className="py-3 px-4 font-medium">{row.name}</td>
                      <td className="py-3 px-4">{row.applications}</td>
                      <td className="py-3 px-4">{row.replies}</td>
                      <td className="py-3 px-4">{row.interviews}</td>
                      <td className="py-3 px-4">
                        <Badge className="bg-primary/20 text-primary">
                          {((row.replies / row.applications) * 100).toFixed(1)}%
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Additional Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-8">
            {data.stats.map((stat: any, index: number) => (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

// Main Analytics Page with Error Boundary
export default function AnalyticsPage() {
  return (
    <ErrorBoundary sectionName="Analytics Dashboard">
      <AnalyticsContent />
    </ErrorBoundary>
  )
}