"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, Activity, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "profile", label: "Profile", icon: User },
  { id: "settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-border-subtle bg-bg-secondary z-50 w-[64px] lg:w-[240px] transition-all duration-300">
      <div className="p-4 flex items-center justify-center lg:justify-start">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="ml-3 font-semibold text-text-primary hidden lg:block tracking-tight">StudentDash</span>
      </div>

      <div className="flex-1 mt-8 px-2 space-y-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "relative flex items-center w-full p-3 rounded-xl transition-colors group",
                isActive ? "text-white" : "text-text-secondary hover:text-text-primary"
              )}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10 flex items-center justify-center lg:justify-start w-full">
                <Icon className="w-5 h-5 shrink-0" />
                <span className="ml-3 hidden lg:block font-medium">{item.label}</span>
              </div>
              
              {/* Tooltip for tablet mode */}
              <div className="absolute left-14 bg-bg-card border border-border-subtle px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity z-50">
                {item.label}
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
