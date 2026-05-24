"use client"

import { motion } from "framer-motion"
import * as LucideIcons from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { ProgressBar } from "./ProgressBar"
import { itemVariants } from "./CourseGrid"

type IconName = keyof typeof LucideIcons

const isValidIcon = (name: string): name is IconName => {
  return name in LucideIcons
}

interface Course {
  id: string
  title: string
  progress: number
  icon_name: string
}

export function CourseTile({ course }: { course: Course }) {
  const IconComponent: LucideIcon = isValidIcon(course.icon_name) 
    ? (LucideIcons[course.icon_name] as LucideIcon) 
    : LucideIcons.BookOpen

  return (
    <motion.article 
      className="relative overflow-hidden rounded-3xl bg-[#111118] border border-white/[0.04] p-6 group cursor-pointer h-full flex flex-col justify-between transition-all hover:border-indigo-500/20"
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      variants={itemVariants}
      aria-label={`${course.title} - ${course.progress}% complete`}
    >
      {/* Hardware-accelerated hover glow overlay */}
      <motion.div 
        className="absolute inset-0 rounded-3xl border border-indigo-500/20 opacity-0 group-hover:opacity-100 pointer-events-none"
        transition={{ duration: 0.3 }}
      />
      
      {/* Top row: Icon + Percentage */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
          <IconComponent className="w-6 h-6 text-indigo-400" />
        </div>
        <span className="text-gray-400 text-sm font-medium">{course.progress}%</span>
      </div>
      
      {/* Title */}
      <h3 className="text-lg font-semibold text-white truncate mb-1 relative z-10" title={course.title}>
        {course.title}
      </h3>

      {/* Status */}
      <p className="text-gray-500 text-sm mb-6 relative z-10">In progress</p>
      
      {/* Progress bar — thinner and more elegant */}
      <ProgressBar progress={course.progress} />
    </motion.article>
  )
}
