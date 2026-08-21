"use client";

import { motion } from "motion/react";
import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroTerminal } from "@/components/hero-terminal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-grid pt-40 pb-24">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-panel px-3 py-1.5 text-[11px] text-text-secondary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green" />
              Simple · Secure · Self-hosted 
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-[40px] sm:text-[52px] font-semibold leading-[1.08] text-text-primary"
            >
              Your entire server fleet,{" "}
              <span className="text-amber text-glow-amber">behind one browser tab.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 max-w-xl text-[16px] leading-relaxed text-text-secondary"
            >
              Bastion is an infrastructure gateway that turns scattered{" "}
              <code className="rounded bg-bg-panel px-1.5 py-0.5 text-[13px] text-text-primary">
                .pem
              </code>{" "}
              files and one-off SSH sessions into a single governed entry point,
              secure, browser-based access, file transfer, and full session
              recording, with no private key ever touching a laptop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button
                variant="primary"
                onClick={() =>
                  document
                    .getElementById("get-started")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Quick install <ArrowRight size={14} />
              </Button>
              <Button variant="secondary">
                <Github size={14} /> View source
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border-soft pt-6 text-[12px] text-text-muted"
            >
              <span>NODE.JS 22+</span>
              <span>POSTGRESQL 16+</span>
              <span>DOCKER COMPOSE</span>
              <span>ASCIICAST v2</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HeroTerminal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
