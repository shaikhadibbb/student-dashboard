"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function ProgressBar({ progress }: { progress: number }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden mt-auto">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-success to-success-glow origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: mounted ? progress / 100 : 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </div>
  );
}
