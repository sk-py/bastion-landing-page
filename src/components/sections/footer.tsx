import Image from "next/image";
import { Github } from "lucide-react";

const COLUMNS = [
  {
    title: "Project",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API reference", href: "#" },
      { label: "Contributing", href: "#" },
      { label: "Issue tracker", href: "#" },
    ],
  },
  {
    title: "Learn more",
    links: [
      { label: "Features", href: "#features" },
      { label: "Security", href: "#security" },
      { label: "Tech stack", href: "#stack" },
      { label: "Roadmap", href: "#roadmap" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border-soft py-14">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col justify-between gap-10 sm:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo.png"
                alt="Bastion"
                width={24}
                height={24}
                className="rounded-[6px]"
              />
              <span className="text-[15px] font-semibold text-text-primary">
                Bastion
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-text-secondary">
              A self-hosted infrastructure gateway for browser-based SSH,
              file transfer, and full session recording.
            </p>
            <a
              href="https://github.com/sk-py/bastion"
              className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-text-secondary transition-colors hover:text-text-primary"
            >
              <Github size={14} /> github.com/your-org/bastion
            </a>
          </div>

          <div className="flex gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="text-[11px] uppercase tracking-wider text-text-muted">
                  {col.title}
                </p>
                <ul className="mt-3 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] text-text-secondary transition-colors hover:text-text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-soft pt-6 text-[11px] text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>MIT License · © 2026 Bastion</span>
          <span>Built with Next.js, Tailwind CSS, and Motion</span>
        </div>
      </div>
    </footer>
  );
}
