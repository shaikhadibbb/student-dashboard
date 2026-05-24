import { createClient } from "@/lib/supabase/server"
import { CourseTile } from "./CourseTile"
import { GridItem } from "./CourseGrid"
import { BookOpen } from "lucide-react"
import { Database } from "@/types/database"

type Course = Database['public']['Tables']['courses']['Row']

export async function CourseGridWrapper() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at")

  if (error) throw error
  
  const courses = data as Course[] | null
  
  if (!courses || courses.length === 0) {
    return (
      <GridItem>
        <div className="col-span-1 flex flex-col items-center justify-center rounded-2xl bg-card-gradient border border-border-subtle p-8 min-h-[200px] text-center">
          <BookOpen className="w-8 h-8 text-text-secondary mb-3" />
          <h3 className="text-text-primary font-medium mb-1">No courses found</h3>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <p className="text-text-secondary text-sm max-w-[200px]">You haven't enrolled in any courses yet.</p>
        </div>
      </GridItem>
    )
  }

  return (
    <>
      {courses.map((course) => (
        <GridItem key={course.id}>
          <CourseTile course={course} />
        </GridItem>
      ))}
    </>
  )
}
