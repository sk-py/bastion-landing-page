import {
  TerminalSquare,
  KeyRound,
  Disc3,
  FolderInput,
  Users,
  ShieldCheck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const FEATURES = [
  {
    icon: TerminalSquare,
    title: "A real terminal that holds its place",
    body: "Full xterm.js SSH access from any device, phone included, with a purpose-built mobile input layer. Close the tab, lock the phone, drop the WiFi, the session is exactly where it was on reconnect.",
  },
  {
    icon: KeyRound,
    title: "Nobody ever sees a credential",
    body: "Server passwords and private keys stay encrypted and are never exposed to the people using them. Access goes to servers, not to secrets.",
  },
  {
    icon: Disc3,
    title: "Every session, recorded and replayable",
    body: "Terminal sessions are captured automatically in a compact, open format and replay frame-by-frame, file transfers marked directly on the timeline. No setup, no opt-in.",
  },
  {
    icon: FolderInput,
    title: "File transfer without leaving the terminal",
    body: "Drag a file onto the terminal and it streams straight to the remote host, no disk buffering, no separate FTP client, no context switch. It shows up in the audit trail like everything else.",
  },
  {
    icon: Users,
    title: "Workspaces and roles that mean something",
    body: "One workspace per deployment, three roles. Owners and admins manage servers and users and can review anyone's session history; everyone else sees only what they've been given.",
  },
  {
    icon: ShieldCheck,
    title: "Revocation that's actually immediate",
    body: "Pull someone's access and any terminal session they had open is severed on the spot, not next time they reconnect, not eventually.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="ls ./features --long"
            title="Everything routed through one governed entry point."
            description="Each of these ships as the default, not an add-on configured after the fact."
          />
        </Reveal>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.06}>
              <SpotlightCard className="group h-full bg-bg-panel p-7 transition-colors hover:bg-bg-panel-raised">
                <f.icon
                  className="text-amber transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:scale-110"
                  size={20}
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 text-[15px] font-semibold text-text-primary">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-text-secondary">
                  {f.body}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
