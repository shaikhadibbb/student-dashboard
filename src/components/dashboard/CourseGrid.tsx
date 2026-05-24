"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      mass: 0.8,
    },
  },
};

export function CourseGrid({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5 opacity-0">
        {children}
      </section>
    );
  }

  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-2 gap-5"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {children}
    </motion.section>
  );
}
