"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SecurityDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<SVGPathElement>(null);
  const line2Ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [line1Ref.current, line2Ref.current].forEach((el, i) => {
        if (!el) return;
        const length = el.getTotalLength();
        gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(el, {
          strokeDashoffset: 0,
          duration: 1,
          delay: i * 0.35,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="grid grid-cols-3 items-center gap-2 sm:gap-6">
        <Node label="Your browser" sub="wherever you are" />
        <Node label="Reverse proxy" sub="private network only" accent />
        <Node label="Bastion" sub="127.0.0.1 loopback" />
      </div>

      <svg
        className="pointer-events-none absolute left-0 top-1/2 -z-10 h-10 w-full -translate-y-1/2"
        viewBox="0 0 300 40"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          ref={line1Ref}
          d="M50 20 H150"
          stroke="#5B8DEF"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <path
          ref={line2Ref}
          d="M150 20 H250"
          stroke="#F5A524"
          strokeWidth="1.5"
        />
      </svg>

      <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-text-muted">
        <Lock size={12} className="text-blue" />
        <span>nothing exposed until you deliberately put something in front of it</span>
      </div>
    </div>
  );
}

function Node({
  label,
  sub,
  accent,
}: {
  label: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={
        "rounded-md border px-3 py-4 text-center sm:px-4 " +
        (accent
          ? "border-amber/40 bg-amber/[0.06]"
          : "border-border bg-bg-panel")
      }
    >
      <p className=" text-[13px] sm:text-[14px] font-semibold text-text-primary">
        {label}
      </p>
      <p className="mt-1 text-[10px] sm:text-[11px] text-text-muted">
        {sub}
      </p>
    </div>
  );
}
