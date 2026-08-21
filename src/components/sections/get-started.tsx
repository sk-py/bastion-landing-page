import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { InstallTabs } from "@/components/install-tabs";
import { InstallStepper } from "@/components/install-stepper";

export function GetStarted() {
  return (
    <section id="get-started" className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="./install.sh"
            title="Running in minutes. No source, no build step."
            description="The install script pulls the deployment files needed, generates secure random values where it safely can, and gets out of the way."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-2">
          <Reveal delay={0.08}>
            <InstallTabs />
            <p className="mt-6 max-w-md text-[13.5px] leading-relaxed text-text-secondary">
              Building from source instead? To swap the logo, adjust the
              theme, or extend functionality, just means cloning the
              repository and running it with hot-reloading for local
              development.
            </p>
          </Reveal>

          <Reveal delay={0.14}>
            <InstallStepper />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
