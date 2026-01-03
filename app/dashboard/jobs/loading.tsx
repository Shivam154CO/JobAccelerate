import { CardSkeleton } from "@/components/ui/skeleton"

export default function JobsLoading() {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 bg-muted animate-pulse rounded" />
        <div className="flex items-center gap-3">
          <div className="h-6 w-24 bg-muted animate-pulse rounded" />
          <div className="h-8 w-24 bg-muted animate-pulse rounded" />
        </div>
      </div>

      {/* Search & filter skeletons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-10 bg-muted animate-pulse rounded" />
        <div className="h-10 w-32 bg-muted animate-pulse rounded" />
      </div>

      {/* Job cards skeletons */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}