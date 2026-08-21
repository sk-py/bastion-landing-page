"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const LINKS = [
  { href: "#problem", label: "Why" },
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "#stack", label: "Stack" },
  { href: "#roadmap", label: "Roadmap" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 z-50 w-full transition-colors duration-300 " +
        (scrolled
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Bastion"
            width={26}
            height={26}
            className="rounded-[6px]"
          />
          <span className="text-[15px] font-semibold text-text-primary">
            Bastion
          </span>
        </a>

        <nav
          className="hidden items-center gap-1 md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className="relative px-3 py-2 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
              {hovered === link.href && (
                <span className="absolute inset-x-2 -bottom-[1px] h-px bg-amber transition-opacity" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/sk-py/bastion"
            className="hidden items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-text-primary sm:flex"
          >
            <Github size={15} />
            <span>GitHub</span>
          </a>
          <Button
            size="sm"
            variant="secondary"
            onClick={() =>
              document
                .getElementById("get-started")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Quick install
          </Button>
        </div>
      </div>
    </header>
  );
}
