import { BookOpen } from "lucide-react"

export function CourseGridSkeleton() {
  return (
    <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-card-gradient border border-border-subtle p-8 min-h-[200px] text-center animate-organic-pulse">
       <BookOpen className="w-8 h-8 text-white/5 mb-3" />
       <div className="h-4 w-32 bg-white/5 rounded-full mb-2" />
       <div className="h-3 w-48 bg-white/5 rounded-full" />
    </div>
  )
}
