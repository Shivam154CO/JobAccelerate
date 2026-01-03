"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { JobCard, JobCardSkeleton } from "@/components/job-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, RefreshCw, AlertCircle } from "lucide-react"
import { useState, useEffect, Suspense } from "react"

// Mock API function (replace with actual API call)
const fetchJobs = async () => {
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay
  
  // Simulate random errors
  if (Math.random() < 0.1) {
    throw new Error("Failed to fetch jobs. Please try again.")
  }
  
  return [
    {
      id: 1,
      title: "Senior Product Manager",
      company: "Stripe",
      location: "San Francisco, CA",
      salary: "$180K - $250K",
      matchScore: 94,
      tags: ["Remote", "Management", "B2B SaaS"],
      posted: "2 hours ago",
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "Vercel",
      location: "Remote",
      salary: "$150K - $200K",
      matchScore: 87,
      tags: ["Remote", "React", "Node.js"],
      posted: "4 hours ago",
    },
    {
      id: 3,
      title: "Design System Lead",
      company: "Figma",
      location: "San Francisco, CA",
      salary: "$160K - $220K",
      matchScore: 79,
      tags: ["Design", "Leadership", "UI/UX"],
      posted: "6 hours ago",
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "Airbnb",
      location: "San Francisco, CA",
      salary: "$170K - $230K",
      matchScore: 85,
      tags: ["ML", "Python", "Analytics"],
      posted: "8 hours ago",
    },
  ]
}

// Error display component
function JobsError({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6">
      <div className="flex items-center gap-3 text-destructive mb-4">
        <AlertCircle className="h-6 w-6" />
        <h3 className="text-lg font-semibold">Failed to load jobs</h3>
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

// Jobs Content Component
function JobsContent() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchJobs()
      setJobs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
      console.error("Failed to load jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesFilters = selectedFilters.length === 0 ||
      selectedFilters.every(filter => job.tags.includes(filter))
    
    return matchesSearch && matchesFilters
  })

  // Handle job save
  const handleSaveJob = async (jobId: number) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      console.log(`Job ${jobId} saved successfully`)
      // In a real app, update local state or refetch
    } catch (err) {
      console.error("Failed to save job:", err)
    }
  }

  // Handle job click
  const handleJobClick = (jobId: number) => {
    console.log(`Job ${jobId} clicked`)
    // Navigate to job details or open modal
  }

  if (!isClient) {
    return (
      <div className="space-y-6">
        <div className="h-10 w-48 bg-muted animate-pulse rounded" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <JobsError error={error} onRetry={loadJobs} />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Search skeleton */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
          <div className="h-10 w-32 bg-muted animate-pulse rounded" />
        </div>
        
        {/* Jobs skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Job Matches</h1>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground text-sm">
            {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={loadJobs}
            disabled={loading}
            className="h-8"
          >
            <RefreshCw className={cn("h-3 w-3 mr-2", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search jobs by title, company, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            disabled={loading}
          />
        </div>
        <Button 
          variant="outline" 
          className="border-border/30 bg-transparent hover:bg-accent"
          disabled={loading}
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {selectedFilters.length > 0 && (
            <span className="ml-2 bg-primary text-primary-foreground rounded-full h-5 w-5 text-xs flex items-center justify-center">
              {selectedFilters.length}
            </span>
          )}
        </Button>
      </div>

      {/* No results message */}
      {filteredJobs.length === 0 && searchQuery && (
        <div className="rounded-lg border bg-muted/50 p-6 text-center">
          <p className="text-muted-foreground">
            No jobs found matching "{searchQuery}"
          </p>
          <Button 
            variant="link" 
            className="mt-2"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        </div>
      )}

      {/* Jobs Grid */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              title={job.title}
              company={job.company}
              location={job.location}
              salary={job.salary}
              matchScore={job.matchScore}
              tags={job.tags}
              posted={job.posted}
              onSave={() => handleSaveJob(job.id)}
              onClick={() => handleJobClick(job.id)}
            />
          ))}
        </div>
      ) : !searchQuery && !loading ? (
        <div className="rounded-lg border bg-muted/50 p-6 text-center">
          <p className="text-muted-foreground">No jobs available at the moment.</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={loadJobs}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Check for new jobs
          </Button>
        </div>
      ) : null}
    </>
  )
}

// Main Jobs Page
export default function JobsPage() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <DashboardHeader />

      <main className="ml-20 md:ml-64 pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={
            <div className="space-y-6">
              <div className="h-10 w-48 bg-muted animate-pulse rounded" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            </div>
          }>
            <JobsContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

// Helper function
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}