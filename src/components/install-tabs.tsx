"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, Check } from "lucide-react";

const TABS = [
  {
    id: "unix",
    label: "macOS / Linux",
    command: "curl -fsSL https://bastion.skpy.in/install.sh | sh",
  },
  {
    id: "win",
    label: "Windows (PowerShell)",
    command: "irm https://bastion.skpy.in/install.ps1 | iex",
  },
];

export function InstallTabs() {
  const [active, setActive] = useState(TABS[0].id);
  const [copied, setCopied] = useState(false);
  const current = TABS.find((t) => t.id === active)!;

  const copy = () => {
    navigator.clipboard?.writeText(current.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-2xl border border-border bg-bg-panel overflow-hidden">
      <div className="relative flex border-b border-border-soft bg-bg-panel-raised">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={
              "relative px-5 py-3  text-[12px] transition-colors " +
              (active === tab.id
                ? "text-text-primary"
                : "text-text-muted hover:text-text-secondary")
            }
          >
            {tab.label}
            {active === tab.id && (
              <motion.span
                layoutId="install-tab-indicator"
                className="absolute inset-x-0 -bottom-px h-[2px] bg-amber"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between gap-4 px-5 py-5">
        <AnimatePresence mode="wait">
          <motion.code
            key={active}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className=" text-[13px] text-amber-soft sm:text-[14px] overflow-x-auto whitespace-nowrap scrollbar-none"
          >
            {current.command}
          </motion.code>
        </AnimatePresence>
        <motion.button
          onClick={copy}
          whileTap={{ scale: 0.9 }}
          aria-label="Copy install command"
          className="shrink-0 rounded-xl border border-border p-2 text-text-muted transition-colors hover:text-text-primary hover:border-amber/40"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="block"
              >
                <Check size={14} className="text-green" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
                className="block"
              >
                <Copy size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
