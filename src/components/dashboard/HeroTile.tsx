"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function HeroTile({ streak = 12 }: { streak?: number }) {
  return (
    <motion.article
      className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#111118] to-[#0a0a0f] border border-white/[0.04] p-8 min-h-[240px]"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.8 }}
    >
      {/* Blurred accent orb */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 flex items-start justify-between h-full gap-8">
        {/* Left: Text */}
        <div className="max-w-xl flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Welcome back, Alex.
          </h1>
          <p className="mt-4 text-lg text-gray-400 leading-relaxed">
            You're 3 lessons away from finishing Advanced React Patterns. Keep the streak alive — momentum is the whole game.
          </p>
        </div>

        {/* Right: Streak card */}
        <motion.div
          className="flex flex-col items-center justify-center bg-[#0a0a0f]/60 border border-white/[0.06] rounded-2xl px-8 py-6 min-w-[140px] backdrop-blur-sm shrink-0"
          animate={{
            boxShadow: [
              "0 0 0px rgba(249, 115, 22, 0)",
              "0 0 40px rgba(249, 115, 22, 0.15)",
              "0 0 0px rgba(249, 115, 22, 0)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="text-4xl font-bold text-white">{streak}</span>
          </div>
          <span className="text-gray-500 text-xs uppercase tracking-[0.2em] font-medium">
            Day Streak
          </span>
        </motion.div>
      </div>
    </motion.article>
  );
}
