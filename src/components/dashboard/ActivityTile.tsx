"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const WEEKS = 14;
const DAYS = 7;

export function ActivityTile() {
  const activityData = useMemo(() => {
    return Array.from({ length: WEEKS * DAYS }, (_, i) => ({
      id: i,
      level: Math.floor(Math.random() * 5), // 0-4
    }));
  }, []);

  const getOpacity = (level: number) => {
    const levels = [0.05, 0.2, 0.4, 0.7, 1.0];
    return levels[level] || 0.05;
  };

  return (
    <motion.article
      className="col-span-1 md:col-span-2 relative overflow-hidden rounded-3xl bg-bg-card border border-border-subtle p-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.4 }}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Activity</h3>
          <p className="text-text-muted text-sm mt-1">Last 14 weeks of practice</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <span>Less</span>
          <div className="flex gap-1">
            {[0.05, 0.2, 0.4, 0.7, 1.0].map((op, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-sm bg-success"
                style={{ opacity: op }}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>

      {/* GitHub-style grid */}
      <div className="grid grid-rows-7 grid-flow-col gap-1.5">
        {activityData.map((day) => (
          <motion.div
            key={day.id}
            className="w-4 h-4 rounded-sm bg-success"
            style={{ opacity: getOpacity(day.level) }}
            whileHover={{
              scale: 1.3,
              transition: { type: "spring", stiffness: 400, damping: 15 },
            }}
          />
        ))}
      </div>
    </motion.article>
  );
}
