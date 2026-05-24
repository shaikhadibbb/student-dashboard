export default function Loading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full pt-8 md:pt-10">
      <div className="mb-8 animate-organic-pulse">
        <div className="h-8 w-48 bg-white/5 rounded-lg mb-2" />
        <div className="h-4 w-64 bg-white/5 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {/* Hero Tile Skeleton */}
        <div className="col-span-1 md:col-span-2 h-[200px] rounded-2xl bg-white/5 border border-white/5 animate-organic-pulse" />
        
        {/* Course Tile Skeletons */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div 
            key={i} 
            className="col-span-1 h-[160px] rounded-2xl bg-white/5 border border-white/5 animate-organic-pulse" 
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}

        {/* Activity Tile Skeleton */}
        <div className="col-span-1 md:col-span-2 h-[200px] rounded-2xl bg-white/5 border border-white/5 animate-organic-pulse" />
      </div>
    </div>
  )
}
