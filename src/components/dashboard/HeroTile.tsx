"use client"

import { motion } from "framer-motion"
import { Flame } from "lucide-react"

export function HeroTile({ streak = 4 }: { streak?: number }) {
  return (
    <article className="col-span-1 md:col-span-2 relative overflow-hidden rounded-2xl bg-card-gradient border border-border-subtle p-6 md:p-8 flex flex-col justify-center min-h-[200px]">
      {/* Subtle gradient mesh background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0.01, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative z-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
          Welcome back, Alex.
        </h1>
        
        <p className="mt-2 text-text-secondary text-lg">
          You&apos;ve learned for {streak} days in a row. Keep the momentum going!
        </p>
        
        {/* Streak Badge */}
        <motion.div 
          className="flex items-center gap-2 mt-4 w-fit bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-full"
          animate={{ 
            boxShadow: [
              "0 0 0px rgba(249, 115, 22, 0)",
              "0 0 20px rgba(249, 115, 22, 0.15)",
              "0 0 0px rgba(249, 115, 22, 0)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-orange-500 text-sm font-semibold">{streak} Day Streak</span>
        </motion.div>
      </motion.div>
    </article>
  )
}
