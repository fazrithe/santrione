import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-2xl border border-forest-100 bg-white shadow-soft", className)}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-forest-50 px-5 py-4">
      <div>
        <h3 className="font-display text-base font-semibold text-ink">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-ink/50">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">{eyebrow}</p>
        )}
        <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
        {description && <p className="mt-1 max-w-2xl text-sm text-ink/60">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendUp = true,
  accent = "forest",
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  accent?: "forest" | "gold";
}) {
  return (
    <Card className="relative overflow-hidden p-5">
      <div
        className={cn(
          "absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.08]",
          accent === "gold" ? "bg-gold-400" : "bg-forest-500"
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-ink/50">{label}</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-ink">{value}</p>
          {trend && (
            <p className={cn("mt-1.5 text-xs font-medium", trendUp ? "text-forest-600" : "text-red-500")}>
              {trend}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl",
            accent === "gold" ? "bg-gold-50 text-gold-600" : "bg-forest-50 text-forest-600"
          )}
        >
          <Icon size={20} />
        </div>
      </div>
    </Card>
  );
}

const badgeStyles: Record<string, string> = {
  active: "bg-forest-50 text-forest-700 border-forest-200",
  paid: "bg-forest-50 text-forest-700 border-forest-200",
  approved: "bg-forest-50 text-forest-700 border-forest-200",
  done: "bg-forest-50 text-forest-700 border-forest-200",
  returned: "bg-forest-50 text-forest-700 border-forest-200",
  completed: "bg-forest-50 text-forest-700 border-forest-200",
  present: "bg-forest-50 text-forest-700 border-forest-200",

  pending: "bg-gold-50 text-gold-700 border-gold-200",
  partial: "bg-gold-50 text-gold-700 border-gold-200",
  in_progress: "bg-gold-50 text-gold-700 border-gold-200",
  borrowed: "bg-gold-50 text-gold-700 border-gold-200",
  draft: "bg-gold-50 text-gold-700 border-gold-200",
  published: "bg-forest-50 text-forest-700 border-forest-200",

  overdue: "bg-red-50 text-red-600 border-red-200",
  unpaid: "bg-red-50 text-red-600 border-red-200",
  rejected: "bg-red-50 text-red-600 border-red-200",
  dropout: "bg-red-50 text-red-600 border-red-200",
  needs_repeat: "bg-red-50 text-red-600 border-red-200",
  alpha: "bg-red-50 text-red-600 border-red-200",
  lost: "bg-red-50 text-red-600 border-red-200",

  alumni: "bg-slate-100 text-slate-600 border-slate-200",
  inactive: "bg-slate-100 text-slate-600 border-slate-200",
  graduated: "bg-slate-100 text-slate-600 border-slate-200",
};

export function Badge({ status, label }: { status: string; label?: string }) {
  const style = badgeStyles[status] ?? "bg-forest-50 text-forest-700 border-forest-200";
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium capitalize", style)}>
      {label ?? status.replace("_", " ")}
    </span>
  );
}

export function Th({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <th className={cn("whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-ink/50", className)}>
      {children}
    </th>
  );
}

export function Td({ children, className }: { children: ReactNode; className?: string }) {
  return <td className={cn("whitespace-nowrap px-4 py-3 text-sm text-ink/80", className)}>{children}</td>;
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-forest-100 bg-white shadow-soft">
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

export function ProgressBar({ value, accent = "forest" }: { value: number; accent?: "forest" | "gold" }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-forest-50">
      <div
        className={cn("h-full rounded-full", accent === "gold" ? "bg-gold-400" : "bg-forest-500")}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );
}
