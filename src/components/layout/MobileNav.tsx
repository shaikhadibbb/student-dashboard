"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, BookOpen, Activity, Settings, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard", active: true },
  { id: "courses", icon: BookOpen, label: "Courses", active: false },
  { id: "activity", icon: Activity, label: "Activity", active: false },
  { id: "profile", icon: User, label: "Profile", active: false },
  { id: "settings", icon: Settings, label: "Settings", active: false },
]

export function MobileNav() {
  const [activeItem, setActiveItem] = useState("dashboard")

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[64px] bg-bg-secondary border-t border-border-subtle z-50 pb-safe" aria-label="Mobile navigation">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              disabled={!item.active}
              className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors",
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
                  layoutId="activeMobileNav"
                  className="absolute inset-0 bg-white/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <div className="relative z-10">
                <Icon className="w-6 h-6" />
              </div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
