"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, Activity, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  { id: "courses", label: "Courses", icon: BookOpen, active: false },
  { id: "activity", label: "Activity", icon: Activity, active: false },
  { id: "profile", label: "Profile", icon: User, active: false },
  { id: "settings", label: "Settings", icon: Settings, active: false },
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-border-subtle bg-bg-secondary z-50 w-[64px] lg:w-[240px] transition-all duration-300" aria-label="Main navigation">
      <div className="p-4 flex items-center justify-center lg:justify-start">
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">S</span>
        </div>
        <span className="ml-3 font-semibold text-text-primary hidden lg:block tracking-tight">StudentDash</span>
      </div>

      <div className="flex-1 mt-8 px-2 space-y-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id
          const Icon = item.icon

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveItem(item.id)}
                disabled={!item.active}
                className={cn(
                  "relative flex items-center w-full p-3 rounded-xl transition-colors",
                  isActive && item.active 
                    ? "text-white" 
                    : item.active
                    ? "text-text-secondary hover:text-text-primary"
                    : "text-text-secondary/50 cursor-not-allowed opacity-60"
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                title={!item.active ? "Coming soon" : item.label}
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
                  {!item.active && <span className="ml-auto text-xs lg:hidden text-text-secondary/70">Soon</span>}
                </div>
              </button>
              
              {/* Tooltip for tablet mode */}
              {item.active && (
                <div className="absolute left-14 bg-bg-card border border-border-subtle px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity z-50">
                  {item.label}
                </div>
              )}
              {!item.active && (
                <div className="absolute left-14 bg-bg-card border border-border-subtle px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  Coming soon
                </div>
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}
