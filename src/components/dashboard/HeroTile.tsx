"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"

export function HeroTile({ streak = 12 }: { streak?: number }) {
  return (
    <article className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#16162a] via-[#111118] to-[#0a0a0f] border border-white/[0.04] p-8 min-h-[240px] flex items-center">
      {/* Blurred accent orb — premium depth effect */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative z-10 flex items-center justify-between w-full gap-8"
      >
        {/* Left side: greeting and description */}
        <div className="max-w-lg flex-1">
          <h1 className="text-4xl font-bold text-white tracking-tight leading-tight mb-1">
            Welcome back, Alex.
          </h1>
          
          <p className="text-lg text-gray-400 leading-relaxed">
            You're 3 lessons away from finishing Advanced React Patterns. Keep the streak alive — momentum is the whole game.
          </p>
        </div>

        {/* Right side: Streak Card — LARGE, prominent centerpiece */}
        <motion.div 
          className="flex flex-col items-center justify-center bg-[#0a0a0f]/80 border border-white/[0.06] rounded-2xl px-8 py-6 min-w-[140px] backdrop-blur-sm shrink-0"
          whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-4xl font-bold text-white">{streak}</span>
          </div>
          <span className="text-gray-500 text-xs uppercase tracking-widest font-medium">Day Streak</span>
        </motion.div>
      </motion.div>
    </article>
  )
}
