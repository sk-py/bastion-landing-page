"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Check } from "lucide-react";

const STEPS = [
  {
    title: "Run the install script",
    body: "Pulls the deployment files needed and generates secure random values where it safely can.",
  },
  {
    title: "Fill in the .env",
    body: "cd bastion, then edit .env for anything still left blank.",
  },
  {
    title: "docker compose up -d",
    body: "Bastion connects to its database, brings the schema up to date, and starts serving.",
  },
  {
    title: "Set the real owner password",
    body: "Open the URL, log in with the bootstrap credentials, and you're managing servers.",
  },
];

export function InstallStepper() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative pl-9">
      <div className="absolute left-[7px] top-1.5 bottom-1.5 w-px bg-border-soft" />
      <motion.div
        style={{ height: lineHeight }}
        className="absolute left-[7px] top-1.5 w-px bg-amber"
      />

      <div className="flex flex-col gap-9">
        {STEPS.map((step, i) => (
          <StepRow key={step.title} step={step} index={i} total={STEPS.length} scrollYProgress={scrollYProgress} />
        ))}
      </div>
    </div>
  );
}

function StepRow({
  step,
  index,
  total,
  scrollYProgress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const threshold = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, threshold - 0.08), threshold + 0.05],
    [0.35, 1]
  );

  return (
    <motion.div style={{ opacity }} className="relative">
      <span className="absolute -left-9 top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-bg bg-bg-panel-raised">
        <Check size={9} strokeWidth={3} className="text-amber" />
      </span>
      <h3 className="text-[15px] font-semibold text-text-primary">
        {step.title}
      </h3>
      <p className="mt-1.5 max-w-md text-[13.5px] leading-relaxed text-text-secondary">
        {step.body}
      </p>
    </motion.div>
  );
}
