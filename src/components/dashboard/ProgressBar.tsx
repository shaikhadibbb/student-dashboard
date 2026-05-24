"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="w-full bg-black/40 rounded-full h-2 mt-4 overflow-hidden border border-white/5 relative">
      <motion.div
        className="absolute inset-y-0 left-0 w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: mounted ? progress / 100 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  )
}
