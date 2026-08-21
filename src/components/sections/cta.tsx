"use client";

import { ArrowRight, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Cta() {
  return (
    <section className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-[12px] text-text-muted">MIT licensed · self-hosted · no vendor lock-in</p>
          <h2 className="mt-4 text-[30px] sm:text-[40px] font-semibold leading-tight text-text-primary">
            One governed entry point.
            <br />
            <span className="text-amber">Zero credentials on anyone&rsquo;s laptop.</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
              <Github size={14} /> Read the source
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
