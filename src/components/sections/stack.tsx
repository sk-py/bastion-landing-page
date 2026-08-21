import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const LAYERS = [
  {
    label: "Frontend",
    items: ["React", "Vite", "TypeScript", "Tailwind CSS", "shadcn/ui", "TanStack Query", "React Router"],
  },
  {
    label: "Backend",
    items: ["Node.js 22+", "Express", "TypeScript", "Zod I/O validation", "ssh2", "busboy"],
  },
  {
    label: "Database",
    items: ["PostgreSQL 16+", "raw pg queries", "node-pg-migrate", "no ORM"],
  },
  {
    label: "Terminal & recording",
    items: ["xterm.js", "asciicast format", "asciinema player"],
  },
  {
    label: "Security",
    items: ["Argon2id password hashing", "SHA-256 session tokens", "parameterized SQL"],
  },
  {
    label: "Deployment",
    items: ["Docker Compose", "hardened non-root image", "read-only container"],
  },
];

export function Stack() {
  return (
    <section id="stack" className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionHeading
            eyebrow="cat ./package.json | jq .stack"
            title="A modular monorepo, no unnecessary abstraction."
            description="Turborepo and pnpm workspaces tie it together, plain, explicit choices at every layer instead of a framework for the sake of one."
          />
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-2xl border border-border">
          {LAYERS.map((layer, i) => (
            <Reveal key={layer.label} delay={i * 0.04} y={8}>
              <SpotlightCard
                lift={false}
                className={
                  "flex flex-col gap-3 border-border-soft px-6 py-5 sm:flex-row sm:items-center sm:gap-8 " +
                  (i % 2 === 0 ? "bg-bg-panel" : "bg-bg-panel-raised") +
                  (i !== LAYERS.length - 1 ? " border-b" : "")
                }
              >
                <span className="w-40 shrink-0 text-[13px] font-semibold text-amber">
                  {layer.label}
                </span>
                <div className="flex flex-wrap gap-2">
                  {layer.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border bg-bg px-2.5 py-1  text-[11.5px] text-text-secondary transition-colors hover:border-amber/40 hover:text-text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
