"use client";

import { Server, Cpu } from "lucide-react";
import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function Audience() {
  return (
    <section className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <Eyebrow>whoami --both</Eyebrow>
          <h2 className="max-w-2xl text-[28px] sm:text-[36px] font-semibold leading-[1.15] text-text-primary">
            Built for anyone who still opens a terminal to reach a machine.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05}>
            <SpotlightCard className="group h-full rounded-2xl border border-border bg-bg-panel p-8">
              <Server
                className="text-blue transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                size={22}
                strokeWidth={1.5}
              />
              <h3 className="mt-5 text-[18px] font-semibold text-text-primary">
                Managing a cloud fleet
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                For a DevOps engineer running dozens of production hosts, Bastion
                replaces per-machine key sprawl with one workspace: every
                connection routed, every credential encrypted at rest, every
                session available for security review, without another
                terminal emulator profile to maintain.
              </p>
            </SpotlightCard>
          </Reveal>

          <Reveal delay={0.12}>
            <SpotlightCard className="group h-full rounded-2xl border border-border bg-bg-panel p-8">
              <Cpu
                className="text-amber transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                size={22}
                strokeWidth={1.5}
              />
              <h3 className="mt-5 text-[18px] font-semibold text-text-primary">
                Running a homelab
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-text-secondary">
                For anyone administering a handful of Raspberry Pis and a NAS,
                Bastion turns a phone or laptop browser into a full terminal,
                reachable over a private network overlay, with no local SSH
                config to keep in sync across devices.
              </p>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
