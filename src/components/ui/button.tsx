"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm";
};

const variants: Record<string, string> = {
  primary:
    "bg-amber text-[#0e0e15] hover:bg-amber-soft shadow-[0_0_0_1px_rgba(125,130,251,0.5),0_8px_24px_-8px_rgba(125,130,251,0.55)]",
  secondary:
    "bg-bg-panel-raised text-text-primary border border-border hover:border-amber/40 hover:bg-[#22222e]",
  ghost: "bg-transparent text-text-secondary hover:text-text-primary",
};

export function Button({
  className,
  variant = "primary",
  size = "default",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ y: -1.5 }}
      whileTap={{ scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-sans text-[13.5px] font-medium tracking-tight transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none",
        variant === "secondary" && "rounded-xl",
        size === "default" ? "h-11 px-5" : "h-9 px-3.5 text-xs",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
