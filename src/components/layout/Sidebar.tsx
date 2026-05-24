"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  BarChart3,
  Settings,
  PanelLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "grades", label: "Grades", icon: GraduationCap },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("analytics");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={cn(
        "h-screen bg-[#0a0a0f] border-r border-white/[0.04] flex flex-col hidden md:flex",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}
    >
      {/* Logo — TEAL CIRCLE WITH SPARKLE */}
      <div className="flex items-center gap-3 px-4 py-5 mb-2">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#14b8a6] to-[#06b6d4] flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-semibold text-base tracking-wide">Atlas</h1>
            <p className="text-gray-500 text-xs uppercase tracking-[0.15em]">Student</p>
          </div>
        )}
      </div>

      {/* Nav items — COMPACT, ELEGANT */}
      <div className="px-2 space-y-1">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "relative flex items-center w-full px-3 py-2.5 rounded-xl text-base font-medium transition-all duration-200",
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-[#16161f] rounded-xl border border-[#6366f1]/25"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    boxShadow: "0 0 15px rgba(99, 102, 241, 0.06), inset 0 1px 0 rgba(255,255,255,0.05)"
                  }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 relative z-10 shrink-0",
                isActive ? "text-white" : "text-gray-500"
              )} />
              {!collapsed && (
                <span className="relative z-10 ml-3">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse button at bottom */}
      <div className="mt-auto p-3 border-t border-white/[0.04]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors w-full px-3 py-2"
        >
          <PanelLeft className={cn("w-4 h-4", collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </nav>
  );
}
