"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

type Line = {
  text: string;
  tone?: "prompt" | "output" | "muted" | "amber";
};

const SCRIPT: Line[] = [
  { text: "bastion connect prod-web-03", tone: "prompt" },
  { text: "authenticated via workspace key · no credential exposed", tone: "muted" },
  { text: "prod-web-03:~$ df -h /var/www", tone: "prompt" },
  { text: "/dev/sda1   40G   18G   22G   45%  /var/www", tone: "output" },
  { text: "prod-web-03:~$ scp ./release-4.2.1.tar.gz :/opt/releases/", tone: "prompt" },
  { text: "↳ transfer complete · marked on session timeline", tone: "amber" },
];

const MARKERS = [53]; // percentage positions along the scrubber
const FILE_MARKER = 78;

export function HeroTerminal() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showScrubber, setShowScrubber] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion.current) {
      setVisibleLines(SCRIPT.map((l) => l.text));
      setShowScrubber(true);
      setPlayhead(60);
      return;
    }

    let cancelled = false;

    async function run() {
      while (!cancelled) {
        setVisibleLines([]);
        setShowScrubber(false);
        setPlayhead(0);

        for (let i = 0; i < SCRIPT.length; i++) {
          if (cancelled) return;
          const full = SCRIPT[i].text;
          for (let c = 1; c <= full.length; c++) {
            if (cancelled) return;
            setVisibleLines((prev) => {
              const next = [...prev];
              next[i] = full.slice(0, c);
              return next;
            });
            await sleep(full.startsWith("↳") || full.includes("·") ? 6 : 14);
          }
          await sleep(220);
        }

        await sleep(300);
        if (cancelled) return;
        setShowScrubber(true);

        const start = Date.now();
        const duration = 3200;
        while (!cancelled) {
          const elapsed = Date.now() - start;
          const pct = (elapsed / duration) * 100;
          if (pct >= 100) break;
          setPlayhead(pct);
          await sleep(30);
        }
        setPlayhead(100);
        await sleep(1400);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-bg-panel overflow-hidden shadow-[0_0_60px_-15px_rgba(125,130,251,0.18)]">
      <div className="flex items-center justify-between border-b border-border-soft bg-bg-panel-raised px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4152]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4152]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4152]" />
          </div>
          <span className="font-mono text-[11px] text-text-muted">
            Bastion — session · prod-web-03
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-green" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            connected
          </span>
        </div>
      </div>

      <div className="px-5 py-6 min-h-[220px] font-mono text-[13px] leading-[1.85]">
        {SCRIPT.map((line, i) => {
          const text = visibleLines[i];
          if (text === undefined) return null;
          const isTyping =
            visibleLines.length - 1 === i && text.length < line.text.length;
          return (
            <div key={i} className="flex gap-2">
              <span
                className={
                  line.tone === "prompt"
                    ? "text-blue"
                    : line.tone === "amber"
                    ? "text-amber"
                    : "text-text-muted"
                }
              >
                {line.tone === "prompt" ? "$" : " "}
              </span>
              <span
                className={
                  line.tone === "output"
                    ? "text-text-secondary"
                    : line.tone === "amber"
                    ? "text-amber"
                    : line.tone === "muted"
                    ? "text-text-muted"
                    : "text-text-primary"
                }
              >
                {text}
                {isTyping && (
                  <span className="blink-caret text-amber">▍</span>
                )}
              </span>
            </div>
          );
        })}
      </div>

      <motion.div
        initial={false}
        animate={{ height: showScrubber ? "auto" : 0, opacity: showScrubber ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="overflow-hidden border-t border-border-soft bg-bg-panel-raised"
      >
        <div className="px-5 py-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
                recorded session · asciicast v2
              </span>
            </div>
            <span className="font-mono text-[10px] text-text-muted">00:34 / 01:12</span>
          </div>

          <div className="relative h-1.5 w-full rounded-full bg-[#242933]">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-amber/70"
              style={{ width: `${playhead}%` }}
            />
            {MARKERS.map((m) => (
              <span
                key={m}
                className={
                  "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-sm rotate-45 " +
                  (m === FILE_MARKER ? "bg-amber" : "bg-blue/70")
                }
                style={{ left: `${m}%` }}
              />
            ))}
            <span
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full border-2 border-amber bg-bg-panel-raised"
              style={{ left: `${playhead}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] text-text-muted">
            <span>connect</span>
            <span className="text-amber">file transfer marked</span>
            <span>replay ready</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
