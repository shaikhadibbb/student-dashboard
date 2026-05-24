export default function Loading() {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Sidebar skeleton */}
      <div className="w-[260px] h-screen bg-bg-secondary border-r border-border-subtle hidden md:block">
        <div className="p-4 space-y-4">
          <div className="h-10 bg-white/5 rounded-xl animate-pulse" />
          <div className="space-y-2">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-10 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main content skeleton */}
      <main className="flex-1 p-6 lg:p-8 space-y-5">
        {/* Hero skeleton */}
        <div className="h-[240px] rounded-3xl bg-bg-card border border-border-subtle animate-pulse" />
        
        {/* Course grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-[200px] rounded-3xl bg-bg-card border border-border-subtle animate-pulse" />
          ))}
        </div>
      </main>
    </div>
  );
}
