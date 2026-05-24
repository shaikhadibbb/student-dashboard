"use client"

import { useEffect } from "react"
import { AlertCircle, RefreshCcw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
        <AlertCircle className="w-8 h-8 text-red-400" />
      </div>
      
      <h2 className="text-2xl font-semibold text-white mb-2 tracking-tight">Something went wrong!</h2>
      <p className="text-text-secondary max-w-md mb-8">
        Couldn&apos;t load your courses. Check your connection and try again.
      </p>
      
      <button
        onClick={() => reset()}
        className="flex items-center px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl transition-colors border border-white/10 font-medium"
      >
        <RefreshCcw className="w-4 h-4 mr-2" />
        Try again
      </button>
    </div>
  )
}
