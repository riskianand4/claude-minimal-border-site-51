import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "text" | "button" | "card"
}

export function EnhancedSkeleton({
  className,
  variant = "default",
  ...props
}: SkeletonProps) {
  const variants = {
    default: "animate-pulse rounded-md bg-muted",
    circular: "animate-pulse rounded-full bg-muted",
    text: "animate-pulse rounded bg-muted h-4 w-full",
    button: "animate-pulse rounded-md bg-muted h-10 w-24",
    card: "animate-pulse rounded-lg bg-muted"
  }

  return (
    <div
      className={cn(variants[variant], className)}
      {...props}
    />
  )
}

// Predefined skeleton components
export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <EnhancedSkeleton variant="card" className="h-[200px] w-full" />
      <div className="space-y-2">
        <EnhancedSkeleton variant="text" className="h-4 w-[250px]" />
        <EnhancedSkeleton variant="text" className="h-4 w-[200px]" />
      </div>
    </div>
  )
}

export function SkeletonTable({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex space-x-4">
        {Array.from({ length: cols }).map((_, i) => (
          <EnhancedSkeleton key={i} variant="text" className="h-4 flex-1" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex space-x-4">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <EnhancedSkeleton key={colIndex} variant="text" className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonList({ items = 5 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <EnhancedSkeleton variant="circular" className="h-12 w-12" />
          <div className="space-y-2 flex-1">
            <EnhancedSkeleton variant="text" className="h-4 w-[250px]" />
            <EnhancedSkeleton variant="text" className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}