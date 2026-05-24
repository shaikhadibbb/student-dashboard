import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges tailwind classes and resolves conflicts safely.
 * Standard utility used in most modern Next.js/Tailwind stacks.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
