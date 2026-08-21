import { Eyebrow } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SecurityScrolly } from "@/components/security-scrolly";

export function Security() {
  return (
    <section id="security" className="border-t border-border-soft py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="max-w-2xl">
          <Eyebrow color="blue">cat ./SECURITY.md</Eyebrow>
          <h2 className=" text-[28px] sm:text-[36px] font-semibold leading-[1.15] text-text-primary">
            Locked down by default, not by configuration.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
            Follow one request from a browser tab to the server it reaches
            and what happens if it gets further than it should.
          </p>
        </Reveal>

        <div className="mt-14">
          <SecurityScrolly />
        </div>

        <Reveal className="mt-6 max-w-2xl rounded-2xl border border-border-soft bg-bg-panel px-5 py-4">
          <p className=" text-[11px] uppercase tracking-wider text-text-muted">
            First launch
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-text-secondary">
            Bastion creates a single owner account automatically and requires
            a real name, email, and password before anything else is
            possible, no shared default credentials left sitting in
            production.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
