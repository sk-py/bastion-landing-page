import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const PROBLEMS = [
  {
    file: "keys.log",
    title: "Keys go everywhere but stay tracked nowhere",
    body: ".pem files get emailed, Slacked, and copied into a dozen ~/.ssh folders. No one can say for certain who still has access to what.",
  },
  {
    file: "transfer.log",
    title: "File transfers scatter across tools",
    body: "Desktop SFTP clients and one-off scp commands move files with no shared record of what went where, or when.",
  },
  {
    file: "incident.log",
    title: "2 AM incidents come with no replay",
    body: "When something breaks, there's no way back to what actually happened, just guesswork about what someone typed.",
  },
  {
    file: "access.log",
    title: "Revocation is a hope, not a guarantee",
    body: "Offboarding someone rarely means their access ends immediately. Old keys and open sessions tend to outlive the person who held them.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="cat ./the-problem.log"
            title="Server access today is a mess of half-measures."
            description="Every workaround solves one part of the problem and quietly creates three more. Bastion exists to replace the whole pile with one governed entry point."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.file} delay={i * 0.06}>
              <SpotlightCard className="rounded-2xl h-full">
                <TerminalWindow path={`~/var/log/${p.file}`} className="h-full">
                  <h3 className=" text-[16px] font-semibold text-text-primary">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-text-secondary">
                    {p.body}
                  </p>
                </TerminalWindow>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
