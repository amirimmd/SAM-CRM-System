import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names intelligently, handling Tailwind conflicts.
 * Essential for high-performance UI rendering and clean code.
 * Usage: cn("bg-red-500", condition && "bg-blue-500") -> "bg-blue-500"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
