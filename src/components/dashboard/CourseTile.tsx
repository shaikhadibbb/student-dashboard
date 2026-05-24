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
      className="relative overflow-hidden rounded-2xl bg-card-gradient border border-border-subtle p-5 md:p-6 group cursor-pointer h-full flex flex-col justify-between transition-all hover:border-accent-glow/50"
      whileHover={{ 
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      variants={itemVariants}
      aria-label={`${course.title} - ${course.progress}% complete`}
    >
      {/* Hardware-accelerated hover glow overlay */}
      <motion.div 
        className="absolute inset-0 rounded-2xl border border-accent-glow opacity-0 group-hover:opacity-100 pointer-events-none"
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon with hardware-accelerated hover background */}
      <div className="relative w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden mb-4">
        <motion.div 
          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.3 }}
        />
        <IconComponent className="w-5 h-5 text-accent-glow relative z-10" />
      </div>
      
      <h3 className="text-lg font-semibold text-text-primary truncate" title={course.title}>
        {course.title}
      </h3>
      
      <ProgressBar progress={course.progress} />
    </motion.article>
  )
}
