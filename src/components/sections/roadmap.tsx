import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const ROADMAP = [
  { title: "Session sharing", body: "Share a recorded session via a unique link for debugging, onboarding, or post-mortems." },
  { title: "Live session shadowing", body: "Let an admin silently observe an active session in real time." },
  { title: "Zero-downtime key rotation", body: "Rotate the encryption key across every stored credential atomically, with automatic rollback." },
  { title: "SSO / OAuth", body: "Google and GitHub login for faster team onboarding." },
  { title: "SSH host fingerprint verification", body: "Cryptographic host verification to guard against man-in-the-middle attacks on first connection." },
  { title: "Cloud storage offload", body: "Move session recordings to S3 or Azure Blob Storage instead of local disk." },
  { title: "Command snippet library", body: "Store and inject frequently-used scripts directly into the terminal." },
  { title: "Zmodem support", body: "Legacy in-terminal file transfer protocol support." },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="cat ./ROADMAP.md"
            title="What's next..."
            description="These are open ideas for where Bastion goes from here, not shipped features. Contributions toward any of them are welcome."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
          {ROADMAP.map((item, i) => (
            <Reveal key={item.title} delay={(i % 4) * 0.05} y={10}>
              <SpotlightCard className="group flex h-full items-start gap-4 bg-bg-panel px-6 py-5">
                <span className="mt-1 text-[11px] text-text-muted transition-colors duration-300 group-hover:text-amber">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className=" text-[14px] font-semibold text-text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
