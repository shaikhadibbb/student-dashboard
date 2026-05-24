"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

const WEEKS = 14
const DAYS = 7

export function ActivityTile() {
  // Generate deterministic mock data for 14 weeks
  const activityData = useMemo(() => {
    return Array.from({ length: WEEKS * DAYS }, (_, i) => ({
      id: i,
      level: Math.floor((Math.abs(Math.sin(i * 1234.5678)) * 1.5) + (i % 3 === 0 ? 1 : 0)) % 5,
    }))
  }, [])

  const getOpacity = (level: number) => {
    const levels = [0.1, 0.3, 0.5, 0.8, 1.0]
    return levels[level] || 0.1
  }

  return (
    <article className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-[#111118] border border-white/[0.04] p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Activity</h3>
          <p className="text-gray-500 text-sm mt-1">Last 14 weeks of practice</p>
        </div>
        
        {/* Legend at top right — integrated and clean */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Less</span>
          <div className="flex gap-1" role="presentation">
            {[0.1, 0.3, 0.5, 0.8, 1.0].map((op, i) => (
              <div key={i} className="w-3 h-3 rounded-sm bg-emerald-500" style={{ opacity: op }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      
      {/* GitHub-style contribution grid: 7 rows (days), 14 columns (weeks) */}
      <div 
        className="grid gap-1.5"
        style={{ 
          gridTemplateRows: `repeat(7, minmax(0, 1fr))`,
          gridAutoFlow: 'column'
        }}
        role="img"
        aria-label="Learning activity heatmap for the last 14 weeks"
      >
        {activityData.map((day) => (
          <motion.div
            key={day.id}
            className="w-4 h-4 rounded-sm bg-emerald-500"
            style={{ opacity: getOpacity(day.level) }}
            whileHover={{ 
              scale: 1.3,
              transition: { type: "spring", stiffness: 400, damping: 15 }
            }}
            title={`Activity level: ${day.level} out of 4`}
            aria-label={`Activity level: ${day.level}`}
          />
        ))}
      </div>
    </article>
  )
}
