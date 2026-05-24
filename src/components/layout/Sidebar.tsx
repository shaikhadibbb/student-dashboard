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
    <nav className="hidden md:flex flex-col h-screen fixed left-0 top-0 border-r border-white/[0.04] bg-[#0a0a0f] z-50 w-[64px] lg:w-[260px] transition-all duration-300" aria-label="Main navigation">
      {/* Branding section */}
      <div className="flex items-center gap-3 px-4 py-5 lg:px-6 border-b border-white/[0.04]">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 font-bold text-white">
          A
        </div>
        <div className="hidden lg:block">
          <h1 className="text-white font-semibold text-sm tracking-wide">Atlas</h1>
          <p className="text-gray-600 text-xs uppercase tracking-widest">Student</p>
        </div>
      </div>

      {/* Navigation items */}
      <div className="flex-1 mt-6 px-2 space-y-2 lg:px-4">
        {navItems.map((item) => {
          const isActive = activeItem === item.id
          const Icon = item.icon

          return (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveItem(item.id)}
                disabled={!item.active}
                className={cn(
                  "relative flex items-center w-full p-3 rounded-lg transition-colors",
                  isActive && item.active 
                    ? "text-white" 
                    : item.active
                    ? "text-gray-400 hover:text-gray-300"
                    : "text-gray-600 cursor-not-allowed opacity-50"
                )}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                title={!item.active ? "Coming soon" : item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white/5 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="relative z-10 flex items-center justify-center lg:justify-start w-full">
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="ml-3 hidden lg:block font-medium text-sm">{item.label}</span>
                  {!item.active && <span className="ml-auto text-xs lg:hidden text-gray-500">Soon</span>}
                </div>
              </button>
              
              {/* Tooltip for mobile/tablet */}
              {item.active && (
                <div className="absolute left-14 bg-[#111118] border border-white/[0.06] px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                </div>
              )}
              {!item.active && (
                <div className="absolute left-14 bg-[#111118] border border-white/[0.06] px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 lg:hidden pointer-events-none transition-opacity z-50 whitespace-nowrap">
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
