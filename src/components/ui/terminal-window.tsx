import { cn } from "@/lib/utils";

export function TerminalWindow({
  path,
  status,
  children,
  className,
  bodyClassName,
}: {
  path: string;
  status?: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-bg-panel overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-border-soft bg-bg-panel-raised px-4 py-2.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4152]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4152]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#3a4152]" />
          </div>
          <span className="font-mono text-[11px] text-text-muted">{path}</span>
        </div>
        {status && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {status}
          </span>
        )}
      </div>
      <div className={cn("p-6", bodyClassName)}>{children}</div>
    </div>
  );
}
