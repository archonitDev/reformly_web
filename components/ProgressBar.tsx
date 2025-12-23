'use client'

interface ProgressBarProps {
  current: number
  total: number
  className?: string
  startPercentage?: number
}

export default function ProgressBar({ current, total, className = '', startPercentage = 0 }: ProgressBarProps) {
  // Calculate progress: startPercentage + ((current - 1) / (total - 1)) * (100 - startPercentage)
  // This ensures that when current = 1, percentage = startPercentage
  const baseProgress = startPercentage || 0
  const remainingProgress = 100 - baseProgress
  const percentage = total > 1 
    ? baseProgress + ((current - 1) / (total - 1)) * remainingProgress
    : baseProgress
  
  return (
    <div className={`w-full h-1 bg-primary-light rounded-full overflow-hidden ${className}`}>
      <div
        className="h-full bg-primary transition-all duration-300 ease-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      />
    </div>
  )
}
