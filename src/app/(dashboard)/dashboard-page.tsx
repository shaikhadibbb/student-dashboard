import { Suspense } from "react"
import { HeroTile } from "@/components/dashboard/HeroTile"
import { ActivityTile } from "@/components/dashboard/ActivityTile"
import { CourseGrid, GridItem } from "@/components/dashboard/CourseGrid"
import { CourseGridWrapper } from "@/components/dashboard/CourseGridWrapper"
import { CourseGridSkeleton } from "@/components/dashboard/CourseGridSkeleton"

export function DashboardPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full pt-6 md:pt-8">
      <CourseGrid>
        {/* Bento Grid Layout — Hero tile is the header */}
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
