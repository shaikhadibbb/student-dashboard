import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { HeroTile } from "@/components/dashboard/HeroTile";
import { CourseGrid } from "@/components/dashboard/CourseGrid";
import { CourseTile } from "@/components/dashboard/CourseTile";
import { ActivityTile } from "@/components/dashboard/ActivityTile";
import { Course } from "@/types/database";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at");

  const courses = data as Course[] | null;

  if (error) {
    throw new Error(`Failed to fetch courses: ${error.message}`);
  }

  return (
    <div className="flex min-h-screen bg-bg-primary pb-20 md:pb-0">
      <Sidebar />
      
      <main className="flex-1 p-8 lg:p-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <HeroTile />
          
          <div className="col-span-1 md:col-span-2">
            <CourseGrid>
              {courses?.map((course) => (
                <CourseTile key={course.id} course={course} />
              ))}
            </CourseGrid>
          </div>
          
          <ActivityTile />
        </div>
      </main>
      
      <MobileNav />
    </div>
  );
}
