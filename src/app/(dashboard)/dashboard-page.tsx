import { Suspense } from "react"
import { HeroTile } from "@/components/dashboard/HeroTile"
import { ActivityTile } from "@/components/dashboard/ActivityTile"
import { CourseGrid, GridItem } from "@/components/dashboard/CourseGrid"
import { CourseGridWrapper } from "@/components/dashboard/CourseGridWrapper"
import { CourseGridSkeleton } from "@/components/dashboard/CourseGridSkeleton"

export function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full pt-8 md:pt-10">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-tight">Overview</h2>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <p className="text-text-secondary mt-1">Here's what's happening with your courses today.</p>
      </div>

      <CourseGrid>
        {/* Bento Grid Layout */}
        <GridItem>
          <HeroTile />
        </GridItem>
        
        <Suspense fallback={<GridItem><CourseGridSkeleton /></GridItem>}>
          <CourseGridWrapper />
        </Suspense>

        <GridItem>
          <ActivityTile />
        </GridItem>
      </CourseGrid>
    </div>
  )
}
