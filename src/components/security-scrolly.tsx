"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import gsap from "gsap";
import { Check, Globe, Lock, Server, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const STAGES = [
  {
    icon: Globe,
    kicker: "01 · from anywhere",
    title: "The request leaves the browser.",
    body: "There's no local SSH config, no key on disk, no terminal emulator profile to keep in sync. Just a tab, pointed at a private network address.",
  },
  {
    icon: Lock,
    kicker: "02 · the only door",
    title: "A reverse proxy is the sole entry point.",
    body: "Reachable only from a private network overlay, a personal VPN mesh works well. TLS terminates here, forwarding Upgrade and Connection headers for the WebSocket terminal.",
  },
  {
    icon: Server,
    kicker: "03 · never on the internet",
    title: "Bastion itself stays on loopback.",
    body: "Bound to 127.0.0.1 on the host by default, not reachable from the network or the internet until something is deliberately put in front of it.",
  },
  {
    icon: ShieldCheck,
    kicker: "04 · worst case, still contained",
    title: "The runtime assumes it will be reached anyway.",
    body: "Unprivileged non-root user, read-only root filesystem, every Linux capability dropped. A compromise has almost nothing to work with.",
  },
];

export function SecurityScrolly() {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        {STAGES.map((stage, i) => (
          <StageBlock
            key={stage.title}
            stage={stage}
            index={i}
            isLast={i === STAGES.length - 1}
            onActivate={() => setActive(i)}
          />
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="sticky top-28">
          <DiagramPanel active={active} />
        </div>
      </div>

      {/* mobile fallback: diagram follows the final stage, no sticky pin */}
      <div className="lg:hidden -mt-4">
        <DiagramPanel active={active} />
      </div>
    </div>
  );
}

function StageBlock({
  stage,
  isLast,
  onActivate,
}: {
  stage: (typeof STAGES)[number];
  index: number;
  isLast: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-10% 0px -35% 0px" });

  useEffect(() => {
    if (inView) onActivate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-[46vh] flex-col justify-center py-8",
        !isLast && "border-b border-border-soft"
      )}
    >
      <span
        className={cn(
          " text-[11px] uppercase tracking-wider transition-colors duration-300",
          inView ? "text-amber" : "text-text-muted"
        )}
      >
        {stage.kicker}
      </span>
      <h3
        className={cn(
          " mt-3 text-[22px] sm:text-[26px] font-semibold leading-snug transition-colors duration-300",
          inView ? "text-text-primary" : "text-text-secondary"
        )}
      >
        {stage.title}
      </h3>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-text-secondary">
        {stage.body}
      </p>
    </div>
  );
}

function DiagramPanel({ active }: { active: number }) {
  const line1 = useRef<SVGLineElement>(null);
  const line2 = useRef<SVGLineElement>(null);

  useEffect(() => {
    [line1, line2].forEach((ref, i) => {
      const el = ref.current;
      if (!el) return;
      const len = el.getTotalLength ? el.getTotalLength() : 100;
      const shouldDraw = active > i;
      gsap.to(el, {
        strokeDashoffset: shouldDraw ? 0 : len,
        duration: 0.6,
        ease: "power2.out",
      });
    });
  }, [active]);

  const nodes = [
    { label: "Browser", sub: "You, Anywhere", icon: Globe },
    { label: "Reverse proxy", sub: "Private Network", icon: Lock },
    { label: "Bastion", sub: "127.0.0.1", icon: Server },
  ];

  return (
    <div className="rounded-2xl border border-border bg-bg-panel p-8">
      <div className="flex flex-col items-stretch gap-0">
        {nodes.map((node, i) => (
          <div key={node.label}>
            <div
              className={cn(
                "flex items-center gap-4 rounded-xl border px-4 py-3.5 transition-all duration-300",
                active >= i
                  ? "border-amber/40 bg-amber-dim"
                  : "border-border bg-bg"
              )}
            >
              <node.icon
                size={16}
                className={active >= i ? "text-amber" : "text-text-muted"}
              />
              <div>
                <p
                  className={cn(
                    " text-[13.5px] font-semibold transition-colors duration-300",
                    active >= i ? "text-text-primary" : "text-text-muted"
                  )}
                >
                  {node.label}
                </p>
                <p className=" text-[10.5px] text-text-muted">
                  {node.sub}
                </p>
              </div>
            </div>

            {i < nodes.length - 1 && (
              <svg
                className="mx-auto h-8 w-px overflow-visible"
                width="2"
                height="32"
              >
                <line
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="32"
                  stroke="var(--border)"
                  strokeWidth="2"
                />
                <line
                  ref={i === 0 ? line1 : line2}
                  x1="1"
                  y1="0"
                  x2="1"
                  y2="32"
                  stroke="#7D82FB"
                  strokeWidth="2"
                  strokeDasharray="32"
                  strokeDashoffset="32"
                />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div
        className={cn(
          "mt-6 grid gap-2 border-t border-border-soft pt-6 transition-opacity duration-500",
          active >= 3 ? "opacity-100" : "opacity-30"
        )}
      >
        {[
          "Unprivileged, non-root user",
          "Read-only root filesystem",
          "All Linux capabilities dropped",
          "Two writable paths only: recordings, logs",
        ].map((item, i) => (
          <div key={item} className="flex items-center gap-2.5">
            <span
              className={cn(
                "flex h-4 w-4 shrink-0 items-center justify-center rounded-sm transition-colors duration-300",
                active >= 3 ? "bg-amber-dim" : "bg-bg"
              )}
              style={{
                transitionDelay: active >= 3 ? `${i * 90}ms` : "0ms",
              }}
            >
              <Check
                size={10}
                strokeWidth={3}
                className={active >= 3 ? "text-amber" : "text-text-muted"}
              />
            </span>
            <span className=" text-[12px] text-text-secondary">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
