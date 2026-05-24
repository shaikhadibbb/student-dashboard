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
  const [activeItem, setActiveItem] = useState("courses");
  const [collapsed, setCollapsed] = useState(false);

  return (
    <nav
      className={cn(
        "h-screen bg-[#0a0a0f] border-r border-white/[0.04] flex flex-col hidden md:flex",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 mb-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#a855f7] flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">A</span>
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-white font-semibold text-base tracking-wide">Atlas</h1>
            <p className="text-gray-500 text-xs uppercase tracking-[0.15em]">Student</p>
          </div>
        )}
      </div>

      {/* Nav items — LARGE, SPACIOUS */}
      <div className="px-3 space-y-2">
        {navItems.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={cn(
                "relative flex items-center w-full px-4 py-3.5 rounded-2xl text-base font-medium transition-all duration-200",
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-[#16161f] rounded-2xl border border-[#6366f1]/30"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{
                    boxShadow: "0 0 20px rgba(99, 102, 241, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)"
                  }}
                />
              )}
              <item.icon className={cn(
                "w-5 h-5 relative z-10 shrink-0",
                isActive ? "text-white" : "text-gray-500"
              )} />
              {!collapsed && (
                <span className="relative z-10 ml-3.5">{item.label}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Collapse button at bottom */}
      <div className="mt-auto p-4 border-t border-white/[0.04]">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 text-gray-500 hover:text-white text-sm transition-colors w-full"
        >
          <PanelLeft className={cn("w-4 h-4", collapsed && "rotate-180")} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </nav>
  );
}
