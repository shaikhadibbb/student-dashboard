"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

const WEEKS = 5
const DAYS = 7

export function ActivityTile() {
  // Generate deterministic mock data (same on every render)
  const activityData = useMemo(() => {
    return Array.from({ length: WEEKS * DAYS }, (_, i) => ({
      id: i,
      level: Math.floor((Math.abs(Math.sin(i * 1234.5678)) * 1.5) + (i % 3 === 0 ? 1 : 0)) % 4, // 0-3 activity level, pseudo-random but stable
    }))
  }, [])

  const getOpacity = (level: number) => {
    const levels = [0.1, 0.3, 0.6, 1.0]
    return levels[level] || 0.1
  }

  return (
    <article className="col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl bg-card-gradient border border-border-subtle p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Learning Activity</h3>
        <span className="text-sm text-text-secondary">Last 5 weeks</span>
      </div>
      
      {/* GitHub-style grid: 7 rows (days), 5 columns (weeks) */}
      <div 
        className="grid grid-rows-7 grid-flow-col gap-1 md:gap-1.5"
        style={{ gridTemplateRows: `repeat(7, minmax(0, 1fr))` }}
      >
        {activityData.map((day) => (
          <motion.div
            key={day.id}
            className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-sm bg-accent"
            style={{ opacity: getOpacity(day.level) }}
            whileHover={{ 
              scale: 1.3,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            title={`Activity level: ${day.level}`}
          />
        ))}
      </div>
      
      {/* Day labels */}
      <div className="flex gap-4 mt-3 text-xs text-text-secondary">
        <span>Less</span>
        <div className="flex gap-1">
          {[0.1, 0.3, 0.6, 1.0].map((op, i) => (
            <div key={i} className="w-3 h-3 rounded-sm bg-accent" style={{ opacity: op }} />
          ))}
        </div>
        <span>More</span>
      </div>
    </article>
  )
}
