"use client";

import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Course } from "@/types/database";
import { itemVariants } from "./CourseGrid";
import { ProgressBar } from "./ProgressBar";

type IconName = keyof typeof LucideIcons;

const isValidIcon = (name: string): name is IconName => {
  return name in LucideIcons;
};

export function CourseTile({ course }: { course: Course }) {
  const IconComponent: LucideIcon = isValidIcon(course.icon_name)
    ? (LucideIcons[course.icon_name] as LucideIcon)
    : LucideIcons.BookOpen;

  return (
    <motion.article
      variants={itemVariants}
      className="relative overflow-hidden rounded-3xl bg-bg-card border border-border-subtle p-6 group cursor-pointer flex flex-col min-h-[200px]"
      whileHover={{
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top row: Icon + Percentage */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 overflow-hidden">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <IconComponent className="w-6 h-6 text-accent-glow relative z-10" />
        </div>
        <span className="text-text-secondary text-sm font-medium">
          {course.progress}%
        </span>
      </div>

      {/* Title + Status */}
      <h3
        className="text-lg font-semibold text-white mb-1 truncate"
        title={course.title}
      >
        {course.title}
      </h3>
      <p className="text-text-muted text-sm mb-6">In progress</p>

      {/* Progress bar */}
      <ProgressBar progress={course.progress} />
    </motion.article>
  );
}
