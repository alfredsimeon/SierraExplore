/**
 * LoadingSpinner Component
 *
 * This component displays a loading spinner with customizable size.
 * It's used throughout the application to indicate loading states.
 */
export function LoadingSpinner({ size = "md", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} border-4 border-gray-300 border-t-green-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  )
}
