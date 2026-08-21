import { cn } from "@/lib/utils";
import { TypingAnimation } from "./typing-animation";

export function Eyebrow({
  children,
  color = "amber",
}: {
  children: string;
  color?: "amber" | "blue";
}) {
  return (
    <div className="mb-4 flex items-center gap-2 font-mono text-[12px] tracking-tight">
      <span className={color === "amber" ? "text-amber" : "text-blue"}>$</span>
      <TypingAnimation className="text-text-secondary" blinkCursor startOnView>
        {children}
      </TypingAnimation>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  color = "amber",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  color?: "amber" | "blue";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <Eyebrow color={color}>{eyebrow}</Eyebrow>
      <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.15] text-text-primary">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
